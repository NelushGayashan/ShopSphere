import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import Account from './components/accounts/Account'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const user = useSelector((state) => state.auth.user); 

  // Set the tab title as "ShopSphere" when the app loads
  useEffect(() => {
    document.title = "ShopSphere";
  }, []);

  // Component to handle protected routes
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/products" />}
          />
          {/* Protected Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"  
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
