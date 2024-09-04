import { getCartItems } from "./localStorage";

export const parseRequestUrl = () => {
    //Create Address for searching
    const address = document.location.hash.slice(1).split('?')[0];
    const queryString = 
        document.location.hash.slice(1).split('?').length === 2
        ? document.location.hash.slice(1).split('?')[1]
        : '';

    const url = address.toLowerCase() || '/';
    const r = url.split('/'); //request url
    const q = queryString.split('='); // query 
    return {
        resource: r[1],
        id: r[2],
        verb: r[3],
        name: q[0],
        value: q[1],
    }
}

export const rerender = async(component) => {
    document.getElementById('main-container').innerHTML = await component.render();
    await component.after_render();
}

export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
}

export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
}

export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-close-button">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-close-button').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if(callback){
            callback();
        }
    })
}

export const redirectUser = () => {
    if(getCartItems().length !== 0){
        //when user has items in their cart, so redirect them to the shipping page
        document.location.hash = '/shipping';   
    } else {
        document.location.hash = '/';
    }
}