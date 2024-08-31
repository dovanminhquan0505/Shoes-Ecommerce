import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import homeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { parseRequestUrl } from "./utils.js";

const routes = { //define the action when we click into each products page
    '/': homeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen, //when user clicks on Cart in the top right menu, it should be redirected to the cart screen
    '/signin': SigninScreen
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = //define the url
        (request.resource ? `/${request.resource}` : '/') +
        (request.id? '/:id': '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl]? routes[parseUrl]: Error404Screen;
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render(); //render the products to views
    await screen.after_render();//render the products to cart
};

//add event listener to the window when the page load and when the hash change
window.addEventListener("load", router);
window.addEventListener('hashchange', router);