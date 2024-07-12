import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import secretOrPrivateKey from '../config/secretOrPrivateKey.js'
import { loginSchema, registerSchema } from '../validators/authValidator.js'

const register = async(req , res)=>{

    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const {username , password , email} = req.body;
        try{
    const hashedPassword = await bcrypt.hash(password , 10);
    console.log(hashedPassword)
        const user = await User.create({username , password:hashedPassword , email});

        res.sendStatus(201);
    }catch(error){
        res.status(500).send({message:'User Creation Failed!' , error});
    }
}

const login = async(req  , res)=>{
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const {username , password} = req.body;
    

    try{
        const user = await User.findOne({where:{username}});
        if(!user) return res.status(404).send({message:'User not found!'});
console.log(user)
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).send({message:'Invalid credentials'});
console.log(isMatch)
        const token = jwt.sign({id:user.id , username:user.username} , secretOrPrivateKey);
console.log(token)
        res.status(200).send({token})

    }catch(error){
        console.log(error)
        res.status(500).send({message:'Login Failed!' , error});
    }
}

export {register , login}