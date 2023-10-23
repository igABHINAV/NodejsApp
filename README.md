# Node.js Website Project Documentation

### To run it , Clone this repository-> in the `.env` file inside `config` folder , write your env variables -> write `npm install` in your terminal -> npm index.js 

## Table of Contents

1. [Models](#models)
2. [Controllers](#controllers)
3. [Routes](#routes)
4. [Middleware](#middleware)
5. [Main Application Entry Point](#main-application-entry-point)
6. [Server Startup](#server-startup)

## 1. Models <a name="models"></a>

### User.js

- **Description:** Represents users in the application. User data includes username, password, name, user type, shopping cart, and catalog of items.
- **Schema:**
  - `username`: String (required)
  - `password`: String (required)
  - `name`: String (required)
  - `type`: String (required) - "Buyer" or "Seller"
  - `cart`: Array of references to "Order" documents
  - `catalog`: Array of references to "Item" documents
- **Methods:**
  - `generateAuthToken()`: Generates a JSON Web Token (JWT) for the user.
- **Pre-save Hook:** Hashes the user's password using bcrypt before saving.

### Item.js

- **Description:** Represents products or items in the application. Item data includes name and price.
- **Schema:**
  - `name`: String (required)
  - `price`: Number (required)

### Order.js

- **Description:** Represents orders placed by users. Order data includes the buyer, seller, and items in the order.
- **Schema:**
  - `buyer`: Reference to the "User" who placed the order
  - `seller`: Reference to the "User" who is the seller for the order
  - `items`: Array of references to "Item" documents

## 2. Controllers <a name="controllers"></a>

### Authentication Controllers

#### Signup

- **Description:** Handles user registration by creating a new user in the database.
- **Endpoint:** `/signup`
- **Method:** POST
- **Request Body:**
  - `name`: User's name
  - `username`: User's chosen username
  - `password`: User's chosen password
  - `type`: User type (either "Buyer" or "Seller")

#### Login

- **Description:** Handles user login by verifying provided credentials and returning a JWT for authenticated users.
- **Endpoint:** `/login`
- **Method:** POST
- **Request Body:**
  - `username`: User's username
  - `password`: User's password
- **Response:**
  - A JWT is set as a cookie and returned in the response.
  - User information is included in the response.

#### Logout

- **Description:** Logs the user out by clearing the JWT cookie.
- **Endpoint:** `/logout`
- **Method:** POST

### Authorization Controllers

#### AddItem

- **Description:** Allows sellers to add items to their catalog.
- **Endpoint:** `/addItem`
- **Method:** POST
- **Request Body:**
  - `List`: An array of items to be added, each with a name and price.
- **Authorization:** Only sellers can add items.

#### getAllSellers

- **Description:** Allows buyers to get a list of all sellers and their catalogs.
- **Endpoint:** `/getAllSellers`
- **Method:** GET
- **Authorization:** Only buyers can access this endpoint.

#### viewSellerCatalog

- **Description:** Allows buyers to view the catalog of a specific seller by passing the seller's ID in the parameters.
- **Endpoint:** `/viewSellerCatalog/:sellerId`
- **Method:** GET
- **Authorization:** Only buyers can access this endpoint.

#### getSellerOrders

- **Description:** Allows sellers to view their orders.
- **Endpoint:** `/getSellerOrders`
- **Method:** GET
- **Authorization:** Only sellers can access this endpoint.

#### createOrder

- **Description:** Allows buyers to create orders for specific items from a seller.
- **Endpoint:** `/createOrder/:seller_id`
- **Method:** POST
- **Request Body:**
  - `items`: An array of items to be included in the order.
- **Authorization:** Only buyers can create orders.

## 3. Routes <a name="routes"></a>

### User Routes (`AuthenticationRoutes.js`):

- **Description:** These routes are for user authentication, including login, registration, and logout.
- **Endpoints:**
  - `/login`: POST request to log in a user.
  - `/register`: POST request to register a new user.
  - `/logout`: GET request to log out a user.

### Buyer Routes (`BuyerRoute.js`):

- **Description:** These routes are for buyers and are protected by authentication middleware.
- **Endpoints:**
  - `/create-order/:seller_id`: POST request to create an order for specific items from a seller. Requires authentication.
  - `/get-all/list-of-sellers`: GET request to get a list of all sellers and their catalogs. Requires authentication.
  - `/seller-catalog/:sellerID`: GET request to view a specific seller's catalog by passing the seller's ID in the parameters. Requires authentication.

### Seller Routes (`SellerRoute.js`):

- **Description:** These routes are for sellers and are protected by authentication middleware.
- **Endpoints:**
  - `/create-catalog`: POST request to add items to a seller's catalog. Requires authentication.
  - `/orders`: GET request to view a seller's orders. Requires authentication.

## 4. Middleware <a name="middleware"></a>

### Authentication Middleware (`Authenticate.js`)

- **Description:** This middleware is responsible for authenticating and verifying user access to protected routes. It checks for the presence of a valid JSON Web Token (JWT) in the user's cookies and verifies its authenticity.

- **Usage:** This middleware should be used to protect routes that require user authentication.

- **Functionality:**
  - Checks for the presence of a JWT in the user's cookies.
  - Verifies the authenticity of the token using the JWT secret stored in the environment variables.
  - If the token is valid, the user's data is attached to the `req.user` property, making it available for subsequent route handlers.
  - If the token is not valid or missing, it responds with an error message and clears the token cookie.

- **Security Considerations:**
  - Ensure that routes requiring authentication use this middleware to protect them.
  - Always verify the JWT token to prevent unauthorized access.
  - Handle potential token verification errors and unauthorized access appropriately.

## 5. Main Application Entry Point (`app.js`) <a name="main-application-entry-point"></a>

- **Description:** This is the main entry point for your Node.js application.
- Sets up Express, middleware, and routes.
- Connects routes for user authentication, buyer operations, and seller operations.

## 6. Server Startup (`index.js`) <a name="server-startup"></a>

- **Description:** The entry point to start the server.
- Connects to the database using `connectDB()` from the `Database.js` configuration.
- Starts the Express app and listens on the specified port.

This revised documentation provides a detailed overview of the different components and functionality of your Node.js website project, excluding the "Introduction" and "Project Overview" sections
