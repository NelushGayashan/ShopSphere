// src/components/Products/ProductDetailModal.jsx
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  CardMedia,
  Rating,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { keyframes } from '@mui/system';

// Animation for the modal (slight bounce effect)
const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

// Custom Zoom Animation for the product image
const zoomIn = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

const ProductDetailModal = ({ open, onClose, selectedProduct }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState(false);
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    setOpenSnackbar(false);
  }, [open]);

  if (!selectedProduct || !user) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <CircularProgress />
        <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
          Loading Product Details...
        </Typography>
      </Box>
    );
  }

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      if (!user.email) {
        console.error('User is not logged in or email is unavailable.');
        setCartLoading(false);
        return;
      }

      const allCarts = JSON.parse(localStorage.getItem('carts')) || [];
      const userCartIndex = allCarts.findIndex(cart => cart.user.email === user.email);

      if (userCartIndex === -1) {
        const newCart = {
          user: { name: user.name, email: user.email },
          Products: [{ ...selectedProduct, quantity: 1 }],
        };
        allCarts.push(newCart);
      } else {
        const userCart = allCarts[userCartIndex];
        const productIndex = userCart.Products.findIndex(item => item.id === selectedProduct.id);

        if (productIndex === -1) {
          userCart.Products.push({ ...selectedProduct, quantity: 1 });
        } else {
          userCart.Products[productIndex].quantity += 1;
        }
      }

      localStorage.setItem('carts', JSON.stringify(allCarts));
      setOpenSnackbar(true);
      setCartLoading(false);
    }, 1000);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleZoom = () => setZoomed(!zoomed);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        animation: `${fadeIn} 0.5s ease-out`,
        backdropFilter: 'blur(10px)',  // Increased blur effect for a refined look
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken background to make content stand out
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '2.2rem', color: 'primary.main', backgroundColor: '#d3d3d3',}}>
        {selectedProduct.title}
      </DialogTitle>

      <DialogContent
        sx={{
          paddingBottom: 3,
          background: 'linear-gradient(135deg, #f8f8f8, #f2f2f2)',
          borderRadius: 2,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, width: '100%' }}>
          {/* Product Image on the Left */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={selectedProduct.image}
              alt={selectedProduct.title}
              sx={{
                height: zoomed ? 350 : 300,
                objectFit: 'contain',
                mb: 3,
                borderRadius: 2,
                boxShadow: 5,
                transition: 'transform 0.3s ease, height 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  cursor: 'zoom-in',
                },
                animation: `${zoomIn} 0.3s ease`,
              }}
              onClick={handleZoom}
            />
          </Box>

          {/* Product Details on the Right */}
          <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 1 }}>
            <Typography variant="h4" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
              ${selectedProduct.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1rem' }}>
              {selectedProduct.description}
            </Typography>

            {/* Rating Section */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
              <Rating
                name="product-rating"
                value={Number(selectedProduct.rating?.rate) || 4}
                precision={0.5}
                readOnly
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant="body2" color="text.secondary">
                ({selectedProduct.rating?.count || 200} Reviews)
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3 , backgroundColor: '#d3d3d3',}}>
        {/* Close Button */}
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            fontWeight: 'bold',
            width: '48%',
            fontSize: '1.1rem',
            borderRadius: 2,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              border: '2px solid #3b8fcb', // Changed border to blue
            },
          }}
        >
          Close
        </Button>

        {/* Add to Cart Button with Animation */}
        <IconButton
          onClick={handleAddToCart}
          color="secondary"
          sx={{
            backgroundColor: '#3b8fcb', // Blue color instead of orange
            color: 'white',
            borderRadius: '50%',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#357ab7', // Darker blue on hover
            },
          }}
        >
          {cartLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            <AddShoppingCart sx={{ fontSize: '2rem' }} />
          )}
        </IconButton>
      </DialogActions>

      {/* Snackbar for Cart Confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`Product added to cart! Quantity: ${
          (JSON.parse(localStorage.getItem('carts')) || [])
            .find(cart => cart.user.email === user.email)
            ?.Products.find(item => item.id === selectedProduct.id)?.quantity || 1
        }`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          zIndex: 1200,
          color: 'white',
          borderRadius: 2,
          padding: '12px 24px',
          fontWeight: 'bold',
        }}
      />
    </Dialog>
  );
};

export default ProductDetailModal;
