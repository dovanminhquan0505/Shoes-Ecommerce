import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
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
        return `<div>Cart Screen</div>`;
    }
}

export default CartScreen;