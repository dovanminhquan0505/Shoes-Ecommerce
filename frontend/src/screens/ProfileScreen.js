import { getMyOrder, update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';
        })
        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else {
                setUserInfo(data);
                //when all of info's user is correct, it will go to home screen
                document.location.hash = '/'
            }
        })
    },
    render: async () => {
        const {name, email} = getUserInfo();
        if(!name){
            //If user is already logged-in, it will go to home screen
            document.location.hash = '/';
        }
        const orders = await getMyOrder();
        return `
            <div class="content profile">
                <div class="profile-info">
                    <div class="form-container">
                        <form id="profile-form">
                            <ul class="form-items">
                                <li>
                                    <h1>User Profile</h1>
                                </li>
                                <li>
                                    <label for="name">Name</label>
                                    <input type="name" name="name" id="name" value = "${name}">
                                </li>
                                <li>
                                    <label for="email">Email</label>
                                    <input type="email" name="email" id="email" value = ${email}>
                                </li>
                                <li>
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password">
                                </li>
                                <li>
                                    <button type="submit" class="primary">Update</button>
                                </li>
                                <li>
                                    <button type="button" id="signout-button">Sign-out</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div class="profile-orders">
                <h2>Order History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL PRICE</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.length === 0 
                                ? `<tr><td colspan="6">No Order Found.</td></tr>`
                                : orders.map((order) => `
                                    <tr>
                                        <td>${order._id}</td>
                                        <td>${order.createdAt}</td>
                                        <td style="font-weight: bold">$${order.totalPrice}</td>
                                        <td>${order.paidAt || 'No'}</td>
                                        <td>${order.deliveredAt || 'No'}</td>
                                        <td style="font-weight: bold"><a href="/#/order/${order._id}">Details</a></td>
                                    </tr>
                                `).join('\n')
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
};

export default ProfileScreen;