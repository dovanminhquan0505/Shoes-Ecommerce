import express from 'express';
import User from './models/userModel';

const userRouter = express.Router();

userRouter.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: 'shoesheaven'
        });
        const createUser = await user.save();
        res.send(createUser);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});