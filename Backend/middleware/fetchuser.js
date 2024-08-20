const jwt = require('jsonwebtoken')
const JWT_SECRET = "Thisismysecret"

const fetchuser=(req,res,next)=>{
    // Taking Authentication Token that was entered in header of ThunderClient.
    const token = req.header('AuthToken');
    if(!token){
        res.status(401).send("Please enter a valid token")
    }
    try {
        // Verifying user entered and original Token.
        // If the verification succeeds, it returns the decoded payload (in this case, likely containing user information).
        const data = jwt.verify(token,JWT_SECRET)
        // the decoded user information (extracted from the data object) is assigned to req.user
        req.user = data.user;
        // Executing next function in auth.js and notes.js
        next();
    } catch (error) {
        res.status(401).json({error:"Please enter a valid token"})
    }
}

module.exports = fetchuser;