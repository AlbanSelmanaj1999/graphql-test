const jwt=require('jsonwebtoken');

function checkToken(token){

    try {
        jwt.verify(token,process.env.jwt_secret_key);
        return;
    } catch (error) {
        throw Error("User is not authorized");
    }
}

module.exports={checkToken};