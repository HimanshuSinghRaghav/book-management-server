import jwt from 'jsonwebtoken'
import secretOrPrivateKey from '../config/secretOrPrivateKey.js'

export default function(req , res , next){
    const authorization = req.header('Authorization');
    const token = authorization?.split(' ')[1];
    if(!token) return res.status(401).send({message:'No token , authorization denied!'});

    try{
        const decoded = jwt.verify(token , secretOrPrivateKey);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).send({message:'token is not valid!'})
    }
}