import { getProduct, updateProduct } from "../api";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils";

const ProductEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
                _id: request.id,
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                image: document.getElementById('image').value,
                brand: document.getElementById('brand').value,
                category: document.getElementById('category').value,
                countInStock: document.getElementById('countInStock').value,
                description: document.getElementById('description').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else {
                document.location.hash = '/productlist'
            }
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `
            <div class="content">
                <div>
                    <a href="/#/productlist">Back to products</a>
                </div>
                <div class="form-container">
                    <form id="edit-product-form">
                        <ul class="form-items">
                            <li>
                                <h1>Edit Product ${product._id.substring(0, 8)}</h1>
                            </li>
                            <li>
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" value="${product.name}"/>
                            </li>
                            <li>
                                <label for="price">Price</label>
                                <input type="number" name="price" id="price" value="${product.price}"/>
                            </li>
                            <li>
                                <label for="image">Image (680 x 830)</label>
                                <input type="text" name="image" id="image" value="${product.image}"/>
                            </li>
                            <li>
                                <label for="brand">Brand</label>
                                <input type="text" name="brand" id="brand" value="${product.brand}"/>
                            </li>
                            <li>
                                <label for="countInStock">Count In Stock</label>
                                <input type="number" name="countInStock" id="countInStock" value="${product.countInStock}"/>
                            </li>
                            <li>
                                <label for="category">Category</label>
                                <input type="text" name="category" id="category" value="${product.category}"/>
                            </li>
                            <li>
                                <label for="description">Description</label>
                                <input type="text" name="description" id="description" value="${product.description}"/>
                            </li>
                            <li>
                                <button type="submit" class="primary">Update</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        `;
    }
}

export default ProductEditScreen;