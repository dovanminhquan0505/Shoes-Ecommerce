import express from "express";
import { isAdmin, isAuth } from "../utils";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    //Return all orders
    const orders = await Order.find({}).populate('user');
    res.send(orders);
}))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    } else {
        res.status(404).send({message: 'Order not found'});
    }
}));

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
    res.status(201).send({ message: 'New order created', order: createdOrder });
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async (req, res) => {
    const order = Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Data.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
        }
        const updatedOrder = await order.save(); 
        res.send({ message: 'Order Paid!', order: updatedOrder });
    }else {
        res.status(404).send({message: 'Order not found'});
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        const deletedOrder = await Order.deleteOne({_id: req.params.id});
        res.send({ message: 'Order Deleted', order: deletedOrder });
    }else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}))

export default orderRouter;