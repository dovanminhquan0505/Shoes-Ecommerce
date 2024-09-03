import { createOrder, deleteOrder, getOrders } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { showLoading, hideLoading, rerender, showMessage } from "../utils"

const OrderListScreen = {
    after_render: () => {
        document.getElementById('create-order-button').addEventListener('click', async () => {
            const data = await createOrder();
            document.location.hash = `/order/${data.order._id}/edit`;
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.onclick = () => {
                document.location.hash = `/order/${editButton.id}/edit`;
            };
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.onclick = async () => {
                if(confirm('Are you sure want to delete this order?')){
                    showLoading();
                    const data = await deleteOrder(deleteButton.id);
                    if(data.error){
                        showMessage(data.error);
                    }else {
                        rerender(OrderListScreen);
                    }
                    hideLoading();
                }
            }
        })
    },
    render: async () => {
        const orders = await getOrders  ();
        return `
            <div class="dashboard">
                ${DashboardMenu.render({selected:'orders'})}
                <div class="dashboard-content">
                    <h1>Order</h1>
                    <button id="create-order-button" class="primary">Create Order</button>
                    <div class="order-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th class="tr-action">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orders.map((order) => `
                                        <tr>
                                            <td>${order._id}</td>
                                            <td>${order.name}</td>
                                            <td>$${order.price}</td>
                                            <td>${order.category}</td>
                                            <td>${order.brand}</td>
                                            <td>
                                                <button id="${order._id}" class="edit-button">Edit</button>
                                                <button id="${order._id}" class="delete-button">Delete</button>
                                            </td>
                                        </tr>
                                    `).join('\n')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

export default OrderListScreen;