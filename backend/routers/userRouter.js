import express from 'express';
import User from '../models/userModel';
//Express-async-handler helps handle errors that arise
//during the execution of async functions without having to write additional code to catch errors (try-catch) in each route handler.
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler(async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@domain.com',
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
    }
}));

export default userRouter;