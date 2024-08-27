import homeScreen from "../screens/HomeScreen.js";
const router = () => {
    const main = document.getElementById('main-container');
    main.innerHTML = homeScreen.render();
};
window.addEventListener("load", router);