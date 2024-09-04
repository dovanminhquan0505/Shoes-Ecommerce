import { deleteOrder, getOrders } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { showLoading, hideLoading, rerender, showMessage } from "../utils"

const OrderListScreen = {
    after_render: () => {
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

        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.onclick = async () => {
                document.location.hash = `/order/${editButton.id}`;
            }
        })
    },
    render: async () => {
        const orders = await getOrders();
        return `
            <div class="dashboard">
                ${DashboardMenu.render({selected:'orders'})}
                <div class="dashboard-content">
                    <h1>Order</h1>
                    <div class="order-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>USER</th>
                                    <th>PAID AT</th>
                                    <th>DELIVERED AT</th>
                                    <th class="tr-action">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orders.map((order) => `
                                        <tr>
                                            <td>${order._id}</td>
                                            <td>${order.createdAt}</td>
                                            <td>$${order.totalPrice}</td>
                                            <td>${order.user.name}</td>
                                            <td>${order.paidAt || 'No'}</td>
                                            <td>${order.deliveredAt || 'No'}</td>
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