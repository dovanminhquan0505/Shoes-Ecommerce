//Change ES5 Form to ES6 Form: const express = require('express') => import express from 'express'
import express from "express";
import cors from "cors";
import data from "./data.js";
import mongoose from "mongoose";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";

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

app.use("/api/users", userRouter);
app.get("/api/products", (req, res) => {
    res.send(data.products);
});

//Create backend API for /api/products/:id
app.get('/api/products/:id', (req, res) => {
    //get the _id from products when users click on
    const product = data.products.find((x) => x._id === req.params.id)
    if(product){
        res.send(product); 
    } else {
        res.status(404).send("Product not found");
    }
})

app.listen(5000, () => {
    console.log("Server at http://localhost:5000");
});
