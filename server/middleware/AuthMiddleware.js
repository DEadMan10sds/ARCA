//Middleware to check if the user is logged in or not
//It runs before the requests of the forntend
const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');
    if(!accessToken) return res.json({error: "User not logged in"});
    else{
        try {
            const validToken = verify(accessToken, "importantSecret");
            req.user = validToken;
            if(validToken) return next();
        } catch(err) {
            return res.json({error: "No permisos"});
        }
    }
};

module.exports = {validateToken};