import { parseRequestUrl } from '../utils.js'

const ProductScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
    }
}

export default ProductScreen;