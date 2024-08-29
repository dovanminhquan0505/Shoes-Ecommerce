export const getCartItems = () => {
    //Need to pass a key. It's the key for the item that we are going to save in the local storage
    const cartItems = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
};