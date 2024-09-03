import { deliverOrder, getOrder, getPaypalClientId, payOrder } from "../api";
import { getUserInfo } from "../localStorage";
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from "../utils";

const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    showLoading();
    if(!window.paypal){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.async = true;
        script.onload = () => handlePayment(clientId, totalPrice);
        script.onerror = () => {
            hideLoading();
            showMessage('Failed to load PayPal SDK. Please try again later.');
        };
        document.body.appendChild(script);
    }else {
        handlePayment(clientId, totalPrice);
    }
};

//handlePayment function sets up and displays a PayPal button on the web page,
//handles payment logic including creating the transaction, 
//making the payment after authorization, and notifying the user when the payment is successful.
const handlePayment = (clientId, totalPrice) => {
    window.paypal.Button.render({
        env: 'sandbox',
        client: {
            sandbox: clientId,
            production: '',
        },
        locale: 'en_US',
        style: {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        },

        commit: true,
        payment(data, actions){
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total: totalPrice,
                            currency: 'USD',
                        },
                    }],
            });
        },
        onAuthorize(data, actions){
            return actions.payment.execute().then(async (details) => {
                showLoading();
                await payOrder(parseRequestUrl().id, {
                    orderID: data.orderID,
                    payerID: data.payerID,
                    paymentID: details.id,
                });
                hideLoading();
                showMessage('Payment was successfully!', () => {
                    rerender(OrderScreen);
                });
            });
        },
    }, '#paypal-button'
    ).then(() => {
        hideLoading();
    });
};

const OrderScreen = {
    after_render: async () => {
        const request = parseRequestUrl();
        document.getElementById('deliver-order-button').addEventListener('click', async () => {
            showLoading();
            await deliverOrder(request.id);
            hideLoading();
            showMessage('Order Delivered.');
            rerender(OrderScreen);
        })
    },
    render: async () => {
        const { isAdmin } = getUserInfo();
        const request =parseRequestUrl();
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
        } = await getOrder(request.id);
        if(!isPaid){
            addPaypalSdk(totalPrice);
        }
        return `
            <div>
                <h1>Order ${_id}</h1>
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                            ${
                                isDelivered 
                                    ? `<div class="success">Delivered at ${deliveredAt}</div>`
                                    : `<div class="fail">Not Delivered</div>`
                            }
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
                            ${
                                isPaid 
                                    ? `<div class="success">Paid at ${paidAt}</div>`
                                    : `<div class="fail">Not Paid</div>`
                            }
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li>
                                    <h2>Shopping Cart</h2>
                                    <div>Price</div>
                                </li>
                                ${orderItems.map((item) => `
                                        <li>
                                            <div class="cart-image">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>
                                            <div class="cart-name">
                                                <div>
                                                    <a href="/#/product/${item.product}">${item.name}</a>
                                                </div>
                                                <div> Quantity: ${item.quantity}</div>
                                            </div>
                                            <div class="cart-price">${item.price}$</div>
                                        </li>
                                    `)}
                            </ul>
                        </div>
                    </div>
                    <div class="order-action">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div>Items</div>
                                <div>${itemsPrice}$</div>
                            </li>
                            <li>
                                <div>Shipping</div>
                                <div>${shippingPrice}$</div>
                            </li>
                            <li>
                                <div>Tax</div>
                                <div>${taxPrice}$</div>
                            </li>
                            <li class="total">
                                <div>Order Total</div>
                                <div>${totalPrice}$</div>
                            </li>
                            <li><div class="fw" id="paypal-button"></div></li>
                            <li>
                                ${
                                    isPaid && !isDelivered && isAdmin
                                    ? `<button class="primary fw" id="deliver-order-button">Deliver Order</button>`
                                    : ''
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
}

export default OrderScreen;