import homeScreen from "../screens/HomeScreen.js";
import ProductScreen from "../screens/ProductScreen.js";

const routes = {
    '/': homeScreen,
    '/product/:id': ProductScreen,
}

const router = () => {
    const main = document.getElementById('main-container');
    main.innerHTML = homeScreen.render();
};
window.addEventListener("load", router);