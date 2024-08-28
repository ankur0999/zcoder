const zod = require("zod");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../authMiddleware/config");
const { middleware } = require('../authMiddleware/middleware');
const { Post, User, Comment } = require('../database/db');



// route to get all the posts of a particular user
router.get("/feeds/:userId",  async(req, res)=>{
    const userId = req.params.userId;
    
    const user = await User.findOne({
        _id : userId
    });
    try{
    const feed = await Post.find({
        _id: {
            "$in" : user.posts
        }
    });
    res.json({
         feeds: feed
    })}catch(e){
        console.log(e)
    }
});

// route for return all posts
router.get('/posts', async(req, res)=>{
    const response = await Post.find({
        public:{
            "$in": true
        }
    })
    
    res.json({
        Questions : response
    })
});

// route to create post a feed by a user

const feedBody = zod.object({
    title: zod.string(),
    description: zod.string().optional(),
    Tags: zod.array(zod.string()).optional(),
    
    
})

router.post("/post", middleware.userAuthentication,  async(req, res)=>{
    const { success } = feedBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs "
        })
    }
   const feed = await Post.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.userId,
        Tags: req.body.Tags,
        
    })
    try{
        await User.updateOne({
            _id: req.userId,
        },{
            "$push":{
                posts:feed._id
            }
        })
        }catch(e){
            console.log(e)
        } 
    
    const postId = feed._id;
    

    res.json({
        msg: "post uploaded successfully",
        
    })
});

// router for commenting on post
const commentBody = zod.object({
    description: zod.string()
});

router.post("/comment/:postId", middleware.userAuthentication,  async(req, res)=>{
    const { success } = commentBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "incorrect input"
        })
    }
    
    try{
    const user = await User.findById({
        _id: req.userId
    })
    
    
    
    const comment = await Comment.create({
        description: req.body.description,
        firstName : user.firstName,
        userId: req.userId
    })
    
    const postId = req.params.postId;
    
        await Post.updateOne({
            _id: postId
        },{
            "$push":{
                reply: comment._id
            }
        })
    }catch(e){
        console.log(e)
    }
    res.json({
        msg: "comment uploaded successfully"
    })


})

// route for get comment
router.get("/comment/:postId", async(req, res)=>{
    const postId = req.params.postId;
    const post = await Post.findById({
        _id: postId
    });
    try{
        const comment = await Comment.find({
            _id : {
                "$in" : post.reply
            }
        })
        res.json({
            comment: comment
        })
    }catch(e){
        console.log(e)
    }
})

//route for update comment
router.put("/comment/update/:commentId", middleware.userAuthentication, async(req, res)=>{
    const { success } = commentBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            msg: " unable to parse body"
        })
    }
    const commentId = req.params.commentId;
    try{
    await Comment.updateOne({ _id: commentId},req.body)
    res.json({
        msg: "comment update successful"
    })}catch(e){
        console.log(e);
    }
})

// return post by postId
router.get("/getpost/:postId", async(req, res)=>{
    const postId = req.params.postId;
    try{
        const post = await Post.findById({
            _id : postId
        })
        const comment = await Comment.find({
            _id : {
                "$in" : post.reply
            }
        })
        res.json({
            post: post,
            comment: comment
        })
    }catch(e){
        console.log(e);
    }
})

// route for update post
const updatePost = zod.object({
    title : zod.string().optional(),
    description : zod.string().optional(),
    Tags: zod.array(zod.string()).optional(),
    public: zod.boolean().optional()
})

router.put("/update/:postId", middleware.userAuthentication, async(req,res)=>{
    const { success } = updatePost.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "error while updating information"
        })
    }

    const postId = req.params.postId;
    try{
        await Post.updateOne({_id: postId},req.body)
        res.json({
            msg: "update Successful"
        })
    }catch(e){
        console.log(e);
    }
})




module.exports = router;