import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    //x.product is the ID of items inside cart of items 
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }
    } else {
        cartItems = [...cartItems, item];
    }
    //Update the cart items
    setCartItems(cartItems);

    if(forceUpdate){
        rerender(CartScreen);
    }
}

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach(qtySelect => {
            qtySelect.onchange = (e) => {
                const item = getCartItems().find(x => x.product === qtySelect.id);
                addToCart({...item, quantity: Number(e.target.value)}, true);
            }
        });

        const deleteButtons = document.querySelector('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.onclick = () => {
                removeFromCart(deleteButton.id);
            };
        })
    },
    render: async () => {
        const response = parseRequestUrl();
        if(response.id){
            //Users click on add to cart
            const product = await getProduct(response.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                quantity: 1,
            })
        } else {
            //Users click on the cart in the menu
        }
        const cartItems = getCartItems();
        return `
            <div class ="content cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Price</div>
                        </li>
                        ${
                            cartItems.length === 0 ? 
                            '<div>Cart is empty. <a href="/#/">Go Shopping</a>' :
                            cartItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">
                                                ${item.name}
                                            </a>
                                        </div>
                                        <div>
                                            Quantity: 
                                            <select class="qty-select" id="${item.product}">
                                                ${
                                                    [...Array(item.countInStock).keys()].map(x => item.quantity === x + 1
                                                        ? `<option selected value = "${x+1}">${x+1}</option>`
                                                        : `<option value = "${x+1}">${x+1}</option>`
                                                    )
                                                }
                                            </select>
                                            <button type="button" class="delete-button" id="${item.product}">Delete</button>
                                        </div>
                                    </div>
                                    <div class="cart-price">
                                        ${item.price}$
                                    </div>
                                </li>    
                            `).join('\n')
                        }
                    </ul>
                </div>
                <div class="cart-action">
                    <h3>
                        Subtotal (${cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                        :
                        ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}$
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    }
}

export default CartScreen;