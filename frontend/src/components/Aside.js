const Aside = {
    render: async () => {
        return `
            <div class="aside-header">
                <div>Shop By Category</div>
                <button class="aside-close-button" id="aside-close-button">x</button>
            </div>
            <div class="aside-body">
                <ul class="categories">
                    <li>
                        <a href="/#/?q=sneakers">
                            Sneakers
                            <span><i class="fa fa-chevron-right"></i></span>
                        </a>
                    </li>
                    <li>
                        <a href="/#/?q=athletic">
                            Athletic shoes
                            <span><i class="fa fa-chevron-right"></i></span>
                        </a>
                    </li>
                    <li>
                        <a href="/#/?q=oxford">
                            Oxford shoes
                            <span><i class="fa fa-chevron-right"></i></span>
                        </a>
                    </li>
                    <li>
                        <a href="/#/?q=sport">
                            Sport shoes
                            <span><i class="fa fa-chevron-right"></i></span>
                        </a>
                    </li>
                </ul>
            </div>
        `;
    },
    after_render: async () => {
        document.getElementById('aside-container').classList.remove('open');
        document.getElementById('aside-close-button').addEventListener('click', async () => {
            document.getElementById('aside-container').classList.remove('open');
        })
    }
}

export default Aside;