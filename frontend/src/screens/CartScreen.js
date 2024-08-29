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
        return `
            <div>Cart Screen</div>
            <div>${getCartItems().length}</div>
        `;
    }
}

export default CartScreen;