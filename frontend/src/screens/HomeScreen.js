import axios from 'axios';
const homeScreen = {
    //Code to get data from frontend to backend
    render: async () => {
        // Code to fetch data from backend using fetch API
        const response = await axios({ //change fetch to axios when installing npm axios package
            url: "http://localhost:5000/api/products", 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response || response.statusText !== 'OK'){
            return `<div>Error in getting data</div>`;
        };

        const products = response.data;

        return `
            <ul class="products">
                ${products.map(product => `
                    <li>
                        <div class="product">
                            <a href="/#/product/${product._id}">
                                <img src="${product.image}" alt="${product.name}" />
                            </a>
                            <div class="product-name">
                                <a href="/#/product/${product._id}">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="product-brand">
                                ${product.brand}
                            </div>
                            <div class="product-price">
                                ${product.price}$
                            </div>
                        </div>
                    </li>    
                `).join('\n')}
            </ul>
        `
    }
}

export default homeScreen;