import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, setPayment } from "../localStorage";

const PaymentScreen = {
    after_render: () => {
        document.getElementById('payment-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            //Save the payment information
            //Code to read the value of a payment
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({ paymentMethod })
            document.location.hash = '/placeorder'
        })
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name){
            //If user is already logged-in, it will go to home screen
            document.location.hash = '/';
        }
        return `
            ${CheckoutSteps.render({step1: true, step2: true, step3: true})}
            <div class="form-container">
                <form id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1>Payment</h1>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
                                <label for="paypal">Paypal</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="stripe" value="Stripe" checked/>
                                <label for="stripe">Stripe</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" class="primary">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        `
    },
};

export default PaymentScreen;