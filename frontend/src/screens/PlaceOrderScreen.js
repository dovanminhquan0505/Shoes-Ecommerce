import { getCartItems, getPayment, getShipping } from "../localStorage";

const convertCartToOrder = () => {
    const orderItems = getCartItems(); 
    //If don't have any items in the cart, just return user to cart page
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = '/payment';
    }
    //Calculate the price of products
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }
}

const PlaceOrderScreen = {
    after_render: () => {

    },
    render: () => {
        
    }
}

export default PlaceOrderScreen;