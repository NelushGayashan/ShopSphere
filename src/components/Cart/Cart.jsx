// src/components/Cart/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState('Guest'); 

  const user = useSelector((state) => state.auth.user); 

  useEffect(() => {
    if (user && user.email) {
      const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
      const userCart = storedCarts.find(cart => cart.user.email === user.email);
      if (userCart) {
        setCart(userCart.Products);
      }
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else if (user && user.name) {
      setUsername(user.name); 
    }

  }, [user]); 

  useEffect(() => {
    if (user && user.email) {
      const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
      const userCartIndex = storedCarts.findIndex(cart => cart.user.email === user.email);
      
      if (userCartIndex === -1) {
        storedCarts.push({ user: { name: user.name, email: user.email }, Products: cart });
      } else {
        storedCarts[userCartIndex].Products = cart;
      }
      
      localStorage.setItem('carts', JSON.stringify(storedCarts));
    }
  }, [cart, user]); 

  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = (itemId, action) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item };
        if (action === 'increase') {
          updatedItem.quantity += 1;
        } else if (action === 'decrease' && updatedItem.quantity > 1) {
          updatedItem.quantity -= 1;
        }
        return updatedItem;
      }
      return item;
    });

    setCart(updatedCart);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  return (
    <div style={{ padding: '20px', minHeight: '80vh', marginBottom: '60px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#d3d3d3', textAlign: 'center' }}>
        {`${username}'s Cart`}
      </h1>

      {cart.length === 0 ? (
        <p style={{ fontSize: '1.2rem', color: '#888', textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => {
            const itemTotal = item.price * item.quantity; 
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '20px',
                  alignItems: 'center',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '20px',
                  backgroundColor: '#d3d3d3',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '120px',
                    height: 'auto',
                    marginRight: '20px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                />

                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>{item.title}</h3>
                  <p style={{ margin: '5px 0', color: '#555', fontSize: '1rem' }}>{item.description}</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                    ${item.price.toFixed(2)} x {item.quantity} = ${itemTotal.toFixed(2)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.id, 'increase')}
                      style={buttonStyle}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.id, 'decrease')}
                      style={buttonStyle}
                    >
                      <Remove />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveFromCart(item.id)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#ff4d4d',
                        borderColor: '#ff4d4d',
                        color: '#fff',
                        marginLeft: '10px',
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: '30px', fontSize: '1.5rem', fontWeight: 'bold', color: '#d3d3d3', textAlign: 'center' }}>
            Total: ${totalCost.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: '1px solid #4CAF50',
  color: '#fff',
  padding: '8px 16px',
  fontSize: '1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
};

export default Cart;
