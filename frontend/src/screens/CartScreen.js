import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    //x.product is the ID of items inside cart of items 
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        cartItems = cartItems.map((x) =>
            x.product === existItem.product ? item : x
        );
    } else {
        cartItems = [...cartItems, item];
    }
    //Update the cart items
    setCartItems(cartItems);
}

const CartScreen = {
    after_render: () => {

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
            <div class ="cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Price</div>
                        </li>
                        ${
                            cartItems.length === 0 ? 
                            '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>' :
                            cartItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="${`/#/product/${item.product}`}">
                                                ${item.name}
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        Quantity: <select class="qty-select" id="${item.product}">
                                            <option value="1">1</option>
                                        </select>
                                        <button type="button" class="delete-button" id="${item.product}">Delete</button>
                                    </div>
                                </li>    
                            `)
                        }
                    </ul>
                </div>
            </div>
        `;
    }
}

export default CartScreen;