//Change ES5 Form to ES6 Form: const express = require('express') => import express from 'express'
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from 'path'
import config from "./config.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

//Create MongoDB Connection
mongoose
    .connect(config.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
    //if there is an error, I will get a message in the terminal
        console.log(err.message);
    });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRouter);
app.use('/api/products', productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
    res.send({clientId: config.PAYPAL_CLIENT_ID});
});

//This code sets up an Express middleware to serve static files from the uploads directory, 
//and these files are accessible via the /uploads route in your application.
//It allows to store and access uploaded files or other static resources through a specific URL path.
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
//This code is configuring your Express server to serve static assets from the frontend directory located one level up from the current script's directory. 
//This is useful for serving the front-end part of a web application.
app.use(express.static(path.join(__dirname, '/../frontend')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'))
})
app.use((err, req, res, next) => {
    //Check if the error object has a name property and if this property has a value of "ValidationError".
    const status = err.name && err.name === "ValidationError" ? 400 : 500;
    res.status(status).send({message: err.message});
});

app.listen(5000, () => {
    console.log("Server at http://localhost:5000");
});
