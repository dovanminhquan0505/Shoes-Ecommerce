import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        //Define the properties of order items
        orderItems: [
            {
                name: {type: String, required: true},
                image: {type: String, required: true},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true},
                //'type: mongoose.Schema.Types.ObjectId' means it will store the ID of that document,
                //and ref: 'Product' indicates that this ID is associated with the 'Product' collection.
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            },
        ],
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        shipping: {
            address: String,
            city: String,
            postalCode: String,
            country: String,
        },
        payment: {
            paymentMethod: String,
            paymentResult: {
                orderID: String,
                payerID: String,
                paymentID: String,
            },
        },
        //Enter information about the price
        itemsPrice: Number,
        taxPrice: Number,
        shippingPrice: Number,
        totalPrice: Number,
        isPaid: {type: Boolean, required: true, default: false},
        paidAt: Date,
        isDelivered: {type: Boolean, required: true, default: false},
        deliveredAt: Date,
    }, 
    {
        //By having this setting, when I create an order, the time of creation will be saved.
        //When there is an update, the update time will be updated.
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;