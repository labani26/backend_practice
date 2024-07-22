// Middleware:

const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
    try {
       let token = req.header.authorization;
       if(token){
        token = token.split(" ")[1];
        let user = jwt.verify(token, SECRET_KEY);
        req.userId = user._id;
        
       }else{
        res.status(402).json({messege: "Unauthorized User"});
       }
    }catch(error){
        console.log(error);
        res.status(402).json({messege: "Unauthorized User"});
    }
    next();
}

module.exports = auth;