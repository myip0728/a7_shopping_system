This project utilize the tools of React, node.js and mongoDB to implement an online shopping system.

There are three main folders, including the frontend, backend, and admin.

.css file is for defining the visual appearance and the layout of the webpage.
.jsx file is for building the user interfaces.
.js file is for creating the database.

For frontend folder,
We create different jsx files to design the layout and different page.
-> The "App.js" is for controlling the whole rendering process of the webpage.
-> The "Context" folder contains "ShopContext.js" which is for the web to access to the product and user data in the database when the page is rendering.
-> The "Components" folder contains all different components shown in the one of the section of the page
    -> The "Asset" is for containing  the images and assets that used to when the web is rendering, or at the time when developing the frontend part of the web.
    -> The "Breadcrums" is for rendering the Bredcrums section in the product detail page.
    -> The "CartItems" is for rendering the cart item list in the cart page.
    -> The "DescriptionBox" is for rendering the description and comment section of the product in the product detail page.
    -> The "Footer" is for rendering the footer in the bottom of the whole webpage.
    -> The "Hero" is for rendering the Hero part in the Home page.
    -> The "Item" is for rendering the item card that listed in the various pages in the web application.
    -> The "Navbar" is for rendering the navigation bar which placed at the top of the web application.
    -> The "NewArrivals" is for rendering the New Arrivals part to show 4 new product in the Home page.
    -> The "NewLetter" is for rendering the News Letter section in the homepage. However the real feature of the subscription of news letter is not implemented.
    -> The "Offer" is for rendering the Exclusive offer to the best seller of platform.
    -> The "Popular" is for rendering the products that with the highest rating.
    -> The "ProductDisplay" is for rendering the product going to be displayed under each category or search result or product page.
    -> The "RelatedProducts" is for rendering the list of product that the user maybe interested in product details page.
-> The "Pages" folder contains all different components that are constitute the webpages.
    -> The "Cart.jsx" is for rendering the whole cart page, and responsible for handling cart operation and process to checkout page.
    -> The "Checkout.jsx" is for rendering the checkout page when the user selected the item in cart, and responsible for user data updating and process to payment page.
    -> The "Home.jsx" is for rendering the Home page of the web application, and responsible for redirect user to different pages.
    -> The "Login.jsx" is for rendering the Login page of the web application, and responsible for user login process.
    -> The "Payment.jsx" is for rendering the Payment page of the web application, and responsible for user payment process then redirect to Payment Success page.
    -> The "PaymentSuccess.jsx" is for rendering the payment success message when the user has completed the payment.
    -> The "Product.jsx" is for rendering all the details of the product.
    -> The "Search.jsx" is for rendering the search page in the web application, and responsible for product searching process, and redirect to Search result.
    -> The "SearchResult.jsx" is for rendering the search result after user has some input.
    -> The "ShopCategory.jsx" is for rendering the Shop Product page that contains all product with same category, and allow using to interact with.
    -> The "Signup.jsx" is for rendering the Signup page of the web application, and responsible for user registration process.
    -> The "UserPage.jsx" is for rendering the page that contains all the user details, and responsible for user data updating.

For backend folder,
We mainly edit the index.js file for the backend function of the shopping system.
-> Connect the MongoDB database(DB).
-> The "upload" function is for uploading the image to the DB.
-> Declaring the subset/ main component of a product.
-> The "addproduct" function is for sending all the product information to the DB.
-> The "updateproduct" function is for the admin to update the product details to DB.
-> Declaring the subset/ main component of a user.
-> The "removeproduct" function is for the admin to remove the product in DB.
-> The "allproducts" function is for the admin to fetch all the products with its details in DB.
-> The "signup" function is for the users to sign up an account and send the information to DB.
-> The "login" function is for the users to login to the system and the DB search the required account.
-> The "alluser" function is for the admin to fetch all the user in DB.
-> The "removeuser" function is for the admin to remove the user in DB.
-> The "fetchUser" function is for the admin to fetch all the users with its details in DB.
-> The "addtocart" function is for the users to add their product to cart and update the required user's profiles in DB.
-> The "editcart" function is for the users to edit their product, such as the quantity of the product, and update the required user's profiles in DB.
-> The "removecartitem" function is for the users to remove their product from cart and update the required user's profiles in DB.
-> The "updateHistory" function is for the users to update what products they are browsing before and store the required products in DB.
-> The "getuser" function is for getting the user data details.
-> The "updateAddress" function is for the users to update their address in their profile and update their profile in DB.
-> The "updatemobile" function is for the users to update their mobile in their profile and update their profile in DB.
-> The "updatename" function is for the users to update their name in their profile and update their profile in DB.
-> The "postcomment" function is for the users to write comments of their product after purchasing and update their comment in DB.
-> The "paymentsuccess" function is for storing the payment details of users to DB.
-> The "updateuser" function is for the admins to update the users information to DB.


For admin folder,
-> The "src\Pages\Admin" folder is for defining the functions of the admin page.
-> The "src\Components\AddProduct" folder is for adding product. The administrator is able to add the product by entering the product name, short description, product description, 
Number of tags, Number of option, Price, Offer Price, Number of stock, as well as product category. He/She can also upload multiple images to add the product.
-> The "src\Components\ListProduct" folder is for viewing all the products of the webpage. 
-> The "src\Components\ProductDetails" folder is for viewing and editing the product information. 
-> The "src\Components\ListUser" folder is for fetching all the users registered.
-> The "src\Components\UserDetails" folder is for listing and editing all the user information.


To Start the web application

Step 1: open 3 terminal in IDE, 
    First terminal: cd to frontend folder by command "cd frontend".
    Second terminal: cd to frontend folder by command "cd backend".
    Third terminal: cd to frontend folder by command "cd admin".

Step 2:
    In First terminal(frontend): type in the command "npm start"
    In Second terminal(backend): type in the command "node index.js"
    In Third terminal(admin): type in the command "npm run dev"
    
Step 3:
    Access to the client side through http://localhost:3000
    Access to the server side through http://localhost:4000
    Access to the admin side through http://localhost:5173
