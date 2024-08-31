import express from 'express';
import User from '../models/userModel';
//Express-async-handler helps handle errors that arise
//during the execution of async functions without having to write additional code to catch errors (try-catch) in each route handler.
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
    "/createadmin", 
    expressAsyncHandler(async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: 'shoesheaven',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}));

//Add new API and Post API requests
userRouter.post(
    '/signin', 
    expressAsyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
        //Have to install body-parser
        email: req.body.email,
        password: req.body.password,
    });

    if(!signinUser){
        res.status(401).send({message: 'Invalid email or password!'})
    } else{
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser)
        })
    }
}));

userRouter.post(
    '/register', 
    expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const createUser = await user.save();

    if(!createUser){
        res.status(401).send({message: 'Invalid user data!'});
    } else{
        res.send({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            isAdmin: createUser.isAdmin,
            token: generateToken(createUser)
        })
    }
}));

userRouter.put(
    '/:id', 
    expressAsyncHandler(async (req, res) => {
    //findById to find the user with their id by req.params.id
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(404).send({message: 'User Not Found!'});
    } else{
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }
}));

export default userRouter;