# Amazona

1. Create Folder Structure
    1. Create root folder as Amazona
    2. Add fronend and backend folder
    3. Create src folder in frontend
    4. Create index.html with heading Amazona in src
    5. Run npm init in frontend folder
    6. Npm install live-server
    7. Add start command as live-server src --verbose
    8. Run npm start

2. Design Website
    1. Create style.css
    2. Link style.css to index.html
    3. Create div.grid-container
    4. Create header, main, footer
    5. Style html, body
    6. Style, header, main and footer

3. Create Static Home Screen
    1. Create ul.products
    2. Create li
    3. Create div.product
    4. Add .product-image, .product-name, .product-brand, .product-price
    5. Style ul.products and internal divs
    6. Duplicate 2 times to show 3 products

4. Render Dynamic Home Screen
    1. Create data.js
    2. Export an array of 6 products
    3. Create screens/Home Screen.js
    4. export HomeScreen as an object with render() method
    5. implement render()
    6. import data.js
    7. Return products mapped to lis inside an ul
    8. Create app.js
    9. Link it to index.html as module
    10. Set main id to main_container
    11. Create router() function
    12. Set main_container innerHTML to HomeScreen.render()
    13. Set load event of window to router() function

5. Build URL Router
    1. Create routers as route:screen object for home screen
    2. Create utils.js
    3. Export parseRequestURL()
    4. Set URL as hash address split by slash
    5. Return resource, id and verb of url
    6. Update router()
    7. Set request as parseRequestURL()
    8. Build parsedURL and compare with routes
    9. If route exists render it, else render Error404
    10. Create screens/Error404.js and render error message