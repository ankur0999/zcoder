//"use strict";
const zod = require("zod");
const { User, Comment, Discussion } = require("../database/db");
const express = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../authMiddleware/config");
const { middleware } = require("../authMiddleware/middleware");
const bcrypt = require('bcryptjs');
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName:  zod.string(),
    password: zod.string()
})
router.post("/signup", async(req, res) =>{
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const seqPass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        username: req.body.username,
        password: seqPass,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        
    });
    if(user){
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if(!comparePassword){
        return res.status(400).json({
            msg: "Incorrect Password"
        })
    }
    
    

    
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            name: user.firstName,
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
        
})
// update user
const updateUser = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
    gender: zod.string().optional(),
    location: zod.string().optional(),
    birthday: zod.string().optional(),
    summary: zod.string().optional(),
    website: zod.string().optional(),
    github: zod.string().optional(),
    linkedin: zod.string().optional(),
    twitter: zod.string().optional(),
    work: zod.string().optional(),
    education: zod.string().optional(),
    skills: zod.array(zod.string()).optional(),
})

router.put('/update', middleware.userAuthentication, async(req, res)=>{
    const { success } = updateUser.safeParse(req.body);
    const userId = req.userId;
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
}

    const salt = await bcrypt.genSalt(10);
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    await User.updateOne({_id : userId}, req.body);

    res.json({
        message: "Updated successfully"
    })
})

// Search other users
// query parameter: ?filter = ankur

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// get user with object id
router.get("/getuser/:userId", async (req, res)=>{
    const userId = req.params.userId;
    
    try{
    const user = await User.findById({
        _id: userId
    })
    res.json({
        user: user.firstName,
        profile: user
    })}
    catch(e){
        res.json(e);
    }
})

// crating dicussion in users
const discussionBody = zod.object({
    title: zod.string()
});

router.post("/discussion", middleware.userAuthentication, async(req, res)=>{
    const { success } = discussionBody.safeParse(req.body);
    const userId = req.userId;
    if(!success){
        return res.status(411).json({
            message: "incorrect input"
        })
    }
    try{
         
         const discussion = await Discussion.create({
            title: req.body.title,
         })
         await Discussion.updateOne({
            _id: discussion._id
         },{
            "$push":
            {
                users: userId
            }
         })
         await User.updateOne({
            _id: userId
         },{
            "$push":{
                discussion: discussion._id
            }
         })

    }catch(e){
        console.log(e);
    }
    res.json({
        msg: "discussion created successfully"
    })
})

// pushing discussion in different user
router.put("/discussion/:userId/:discussionId", async(req, res)=>{
    const discussionId = req.params.discussionId
    const userId = req.params.userId
    try{
    await User.updateOne({
        _id: userId
    },{
        "$push":{
            discussion: discussionId
        }
    })
    await Discussion.updateOne({
        _id: discussionId
    },{
        "$push":{
            users: userId
        }
    })
    }catch(e){
        console.log(e)
    }
    res.json({
        msg: " discussion sended successfully"
    })
})

// route to get all users of current discussion
router.get("/getusers/discussion/:discussionId", async(req,res)=>{
    const discussionId = req.params.discussionId;
    try{
        const discussion = await Discussion.findById({
            _id: discussionId
        })
        if(discussion){
            const users = await User.find({
                _id:{
                    "$in": discussion.users
                }
            })
            
                res.json({
                    user: users
                })
        }
        
            
    }catch(e){
        console.log(e);
    }
})

// route to get all users current  discussion

router.get("/discussions", middleware.userAuthentication, async(req,res)=>{
    const userId = req.userId;
    try{
    const user = await User.findById({
        _id: userId
    })

    const discussion = await Discussion.find({
        _id: {
            "$in": user.discussion
        }
    })
    res.json({
        discussions: discussion
    })
}catch(e){
    console.log(e);
}

})

// route for get all comment in discussion box
router.get("/comment/:discussionId", async(req,res)=>{
    const discussionId = req.params.discussionId;
    try{
    const discussion = await Discussion.findById({
        _id: discussionId
    })
    const comment = await Comment.find({
        _id: {
            "$in" : discussion.reply
        }
    })
    res.json({
        comment: comment
    })
    }catch(e){
        console.log(e);
    }
    
} )

// route for commenting in discussion box
const commentBody = zod.object({
    description: zod.string()
});
router.post("/comment/:discussionId", middleware.userAuthentication, async(req,res)=>{
    const userId = req.userId;
    const {success} = commentBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: "unable to parse"
        })
    }
    
    try{
    const user = await User.findById({
        _id: userId
    })
    const comment = await Comment.create({
        description: req.body.description,
        firstName: user.firstName,
        userId: userId
    })
    const discussionId = req.params.discussionId;
    await Discussion.updateOne({
        _id: discussionId
    },{
        "$push":{
           reply :comment._id
        }

    })
    }catch(e){
        console.log(e);
    }
    res.json({
        msg:"Comment uploaded successfuly"
    })

}) 

// route for deleting descussion

router.put("/delete/discussion/:discussionId", middleware.userAuthentication, async(req, res)=>{
    const discussionId = req.params.discussionId;
    const userId = req.userId;
    try{
    
    await User.updateOne({
        _id: userId
    },{
        "$pull":{
            discussion: discussionId
        }
    })
    const discussion = await Discussion.findById({
        _id: discussionId
    })

    await Discussion.updateOne({
        _id: discussionId
    },{
        "$pull":{
            users: userId
        }
    })
    
    if(discussion.users.length == 1){
        await Discussion.deleteOne({
            _id: discussionId
        })

    }
    res.json({
        msg: "pulled successfully"
    })
    

}catch(e){
        console.log(e);
    }
    
})


module.exports = router;