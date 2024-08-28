const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");


const middleware = {
    userAuthentication: (req, res, next)=>{
        const  authHeader  = req.headers.authorization;
    
    const token  = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({
            msg: "wrong credential"
        });
    }
    },
    postAuthentication: (req, res, next)=>{
        const postHeader = req.headers.authorization2;
    const token = postHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.postId = decoded.postId;
        next();
    }catch(err){
        return res.status(403).json({
            msg: "wrong credential"
        })
    }
    }
}

module.exports = {
    middleware
}

