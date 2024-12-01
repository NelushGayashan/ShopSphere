# ShopSphere

**ShopSphere** is a modern, feature-rich e-commerce web application designed to provide a seamless online shopping experience. The app's core functionality includes user authentication, product browsing, and a shopping cart that allows users to easily add, update, or remove items. Built using **React** for the frontend and **Redux** for state management, **ShopSphere** ensures a smooth and responsive user interface with the help of **Material UI**. 

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Detailed Explanation of Key Files](#detailed-explanation-of-key-files)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)

## Features

- **User Authentication**: Login, registration, and account management.
- **Responsive UI**: Fully responsive design, optimized for both desktop and mobile devices.
- **Product Display**: Products displayed with images, descriptions, and prices.
- **User Account**: Users can view and update their account details.
- **Material UI**: Styled with Material UI for a modern look and feel.
- **Toast Notifications**: Success and error messages using `react-toastify`.
- **Redux**: State management for user data and authentication.

## Technologies Used

- **Frontend**:
- **React.js**: A popular JavaScript library for building user interfaces, particularly single-page applications. React allows for efficient rendering of UI components and makes the app interactive.
- **Redux Toolkit**: A powerful tool for managing global state across the app, particularly used for handling user authentication and shopping cart data.
- **React Router DOM**: A library for managing navigation and routing in the app. It enables the user to navigate between different pages like the product list, login, and cart.
- **Material UI**: A comprehensive library of pre-built UI components and styles that follow Google's Material Design guidelines. It helps to build a modern, sleek, and responsive interface.
- **Yup**: A JavaScript schema builder used for object validation, especially useful in validating form inputs such as email, password, and other fields.
- **Formik**: A flexible and extensible form library for handling form validation, errors, and state management. It simplifies managing form state in React.
- **React-Toastify**: A library to create customizable toast notifications for displaying messages such as error or success feedback to users in a non-intrusive manner.
- **Tailwind CSS**: A utility-first CSS framework used to build custom designs without leaving the HTML. Tailwind's low-level utility classes make it easy to create a unique and responsive layout.
- **Backend**:
- **LocalStorage**: Since this app does not rely on a traditional backend, **localStorage** is used for persisting user authentication and shopping cart data between sessions. This ensures that user data is retained across page reloads without the need for server-side storage.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/NelushGayashan/ShopSphere.git
cd ShopSphere
```
### 2. Install dependencies
Make sure you have Node.js installed. Then run:

```bash
npm install
```
### 3. Run the app locally
After installing the dependencies, you can start the development server:

```bash
npm run dev
```
This will start the React application on http://localhost:5173.

## Usage

### User Registration
- Go to the registration page (`/register`) to create a new account.
- Enter your details such as name, email, and password.
- Once the registration is successful, you will be redirected to the login page.

### User Login
- Go to the login page (`/login`) and enter your credentials.
- After logging in, you'll be redirected to the home page or the account page.

### User Account
- Once logged in, go to your account page (`/account`) to view.

## Folder Structure

```bash
src/
├── components/          # Reusable React components
│   ├── Auth/            # Auth related components (Login, Register)
│   ├── accounts/        # Account page components
│   ├── Cart/            # Shopping Cart components
│   └── Products/        # Product display components
├── store/               # Redux store and slices
│   ├── authSlice.js     # Authentication slice
│   ├── store.js         # Redux store setup
├── App.jsx              # Main app component
└── index.jsx            # Entry point for React
```

## Detailed Explanation of Key Files:

### `src/components/Auth/Login.jsx`:
- Handles user login logic using Formik for form handling and Yup for validation.
- Displays a loading indicator during the login process.

### `src/components/accounts/Account.jsx`:
- Displays the user account details including their name and email, fetched from the Redux store.
- Prompts the user to log in if not authenticated.

### `src/store/authSlice.js`:
- Contains the Redux slice for user authentication, including the login action and state management.

### `src/App.jsx`:
- Main app component that sets up routing and includes all routes for pages like login, registration, and account.

### `src/components/Cart/Cart.jsx`:
- Handles the shopping cart logic.
- Displays a list of products added to the cart, along with quantity, price, and total.
- Provides options to update quantity and remove items from the cart.

### `src/components/Products/ProductList.jsx`:
- Displays a list of products fetched from a hardcoded array or an API.
- Each product has a button to add it to the cart.

### `src/components/Products/ProductDetailModal.jsx`:
- Displays individual product details such as name, description, price, and image.
- Includes an "Add to Cart" button to add the product to the cart.

### `src/components/Auth/Register.jsx`:
- Handles user registration logic using Formik and Yup for form validation.
- Prompts for user details like name, email, and password.

### `src/components/Layout/Header.jsx`:
- Displays the header of the app, including navigation links for login, registration, account, and cart.
- Includes a cart icon that shows the number of items in the cart.

### `src/store/store.js`:
- Contains the Redux store configuration.
- Combines the `authSlice` and `cartSlice` reducers to create the global store.

## API Integration (If Applicable)

In this project, there is no backend API integration. Instead, **React LocalStorage** is used to persist user authentication state and cart data across page reloads.

### User Authentication:

For user authentication, the application utilizes **LocalStorage** to store the authentication token (or user data) after successful login and retrieves it when necessary.

For example, during login:

```javascript
export const login = (userData) => async (dispatch) => {
  try {
    // In a real-world scenario, you would send a POST request to an API.
    // For this project, we simulate successful login and store the user data in LocalStorage.
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to LocalStorage
    dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};
```
### Storing Cart Data:
Similarly, the shopping cart state is saved to LocalStorage whenever items are added, removed, or updated:

```javascript
export const addToCart = (product) => (dispatch, getState) => {
  const cart = [...getState().cart.items, product];
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart data to LocalStorage
  dispatch({ type: 'ADD_TO_CART', payload: cart });
};
```
### Retrieving Data:
Whenever the app loads or the user navigates to a page that requires authentication or cart data, the stored data is retrieved from LocalStorage:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  dispatch({ type: 'LOGIN_SUCCESS', payload: user });
}

const cart = JSON.parse(localStorage.getItem('cart'));
if (cart) {
  dispatch({ type: 'SET_CART', payload: cart });
}
```
This approach ensures that the app state (user authentication and cart data) persists across page reloads without the need for a backend API.

## Contributing

We welcome contributions to the ShopSphere project! Here are the steps to contribute:

1. Fork the repository.
2. Create a new branch:  
   `git checkout -b feature/your-feature-name`
3. Make your changes.
4. Commit your changes:  
   `git commit -m 'Add your feature'`
5. Push to the branch:  
   `git push origin feature/your-feature-name`
6. Open a pull request with a description of your changes.

## License

ShopSphere is open-source software licensed under the MIT license.

## Screenshots

Here are some screenshots of the ShopSphere application in action:

### Registration Page
![image](https://github.com/user-attachments/assets/71da69a0-4f2f-4b90-8e12-08afd0d50b69)

### Login Page
![image](https://github.com/user-attachments/assets/c9ddd154-f660-4bd4-ade0-fbf9ad833ca1)

### Products Page
![image](https://github.com/user-attachments/assets/cfd464d9-b799-4f1f-ac58-18f353a30bb9)

### Product Item Page
![image](https://github.com/user-attachments/assets/b031911a-1d0f-4985-9211-382f81859102)

### Cart Page
![image](https://github.com/user-attachments/assets/1cac7a96-97ab-4e65-96d6-547b6de2d6ff)

## Live Demo

You can view the live version of ShopSphere on Netlify:

[ShopSphere - Live Demo](https://mellow-sfogliatella-bdb7bc.netlify.app/cart)



