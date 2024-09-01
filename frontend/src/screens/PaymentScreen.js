import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getPayment, setPayment } from "../localStorage";

const PaymentScreen = {
    after_render: () => {
        document.getElementById('payment-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            //Save the payment information
            setPayment({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            })
            document.location.hash = '/payment'
        })
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name){
            //If user is already logged-in, it will go to home screen
            document.location.hash = '/';
        }
        const {address, city, postalCode, country}= getPayment();
        return `
            ${CheckoutSteps.render({step1: true, step2: true})}
            <div class="form-container">
                <form id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1>Payment</h1>
                        </li>
                        <li>
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" value = "${address}"/>
                        </li>
                        <li>
                            <label for="city">City</label>
                            <input type="text" name="city" id="city" value = "${city}"/>
                        </li>
                        <li>
                            <label for="postalCode">Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode" value = "${postalCode}"/>
                        </li>
                        <li>
                            <label for="country">Country</label>
                            <input type="text" name="country" id="country" value = "${country}"/>
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