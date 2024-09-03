import express from "express";
import multer from "multer";
import { isAdmin, isAuth } from "../utils";

//Upload a file in this computer in the local server
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({image: `/${req.file.path}`});
});

export default uploadRouter;