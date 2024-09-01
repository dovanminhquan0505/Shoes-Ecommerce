import express from "express";
import { isAuth } from "../utils";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";

const orderRouter = express.Router();

//Create a route for building or creating an order
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New order created', data: createdOrder });
}));
export default orderRouter;