import { createOrder } from "../api";
import CheckoutSteps from "../components/CheckoutSteps";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils";

const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById('placeorder-button').addEventListener('click', async () => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else {
                clearCart();
                document.location.hash = `/order/${data.order._id}`;
            }
        })
    },
    render: async () => {
        const request =parseRequestUrl();
        const {
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = await getOrder(request.id);
        return `
            <div>
                ${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true})}
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
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
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
}

export default PlaceOrderScreen;