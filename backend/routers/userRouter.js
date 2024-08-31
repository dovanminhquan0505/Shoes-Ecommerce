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

export default userRouter;