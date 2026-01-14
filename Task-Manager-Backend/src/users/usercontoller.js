import createHttpError from "http-errors";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"
import usermodel from "./usermodel.js";
import { config } from "../config/config.js";

const register = async (req, res, next) =>{
  const {name, email, password, role} = req.body;
  if(!name || !email || !password) {
    return next(createHttpError(400, "All fields are require"))
  }

  //database call
  try{
  let user = await usermodel.findOne({email:email})
  if(user) {
    return next(createHttpError(400,"User already exist with this email"))
  }
}catch (errors) {
  return next(createHttpError(400, "Error while getting user"))
}

  //Hashing password

  const hashPassword = await bycrypt.hash(password, 10)


  //create new user
  let newUser;
  try{
    newUser = await usermodel.create({
    name,
    email,
    password:hashPassword,
    role
  });

  }catch(err){
    return next (createHttpError(400, "Error while creating user", err))
  }


  const token = jwt.sign({id:newUser._id, role:newUser.role}, config.jwtSecret);
  res.status(201).json({accessToken:token, role:newUser.role})

}


const loginUser = async (req, res, next) =>{
  const {email, password, role} = req.body;
  
  console.log(req.body)

  if(!email || !password){
    return next(createHttpError(400, "All fields are require"))
  }

  
  let user;
  try{
    user = await usermodel.findOne({email:email});
  if(!user){
    return next(createHttpError(404, "User not found"))
  }
  }catch(error){
    return next (createHttpError(400,"Error while getting user"))
  }
  

  const isMatch = await bycrypt.compare(password, user.password);


  if(!isMatch){
    return next(createHttpError(400, "Username and Password are incorrect"))
  }


  //jwt token
  try{
    const token = jwt.sign({ id:user._id, role:user.role},config.jwtSecret,{expiresIn:"7d"})
  res.status(201).json({accessToken: token, role:user.role, userId:user._id})

  }catch(error){
    return next(createHttpError(500, "Error while signing jwt token"))
  }

}

const getme = async (req, res, next) => {
  try {
    // req.user is set by JWT auth middleware
    const user = await usermodel.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export { register, loginUser, getme};