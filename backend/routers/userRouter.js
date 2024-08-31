import express from 'express';
import User from '../models/userModel';

const userRouter = express.Router();

userRouter.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: 'shoesheaven',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

//Add new API and Post API requests
userRouter.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        //Have to install body-parser
        email: req.body.email,
        password: req.body.password,
    });
    if(!signinUser){
        res.status(401).send({message: 'Invalid email or password!'})
    }
})

export default userRouter;