const Header = {
    render: () => {
        return `
            <div class="brand">
                <a href="/#/">Shoes Haven</a>
            </div>
            <div>
                <a href="/#/cart">Cart</a>
                <a href="/#/signin">Sign-In</a>
            </div>
        `
    },
    after_render: () => {

    }
};

export default Header;