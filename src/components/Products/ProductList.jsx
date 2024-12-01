// src/components/Products/ProductList.jsx
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ProductDetailModal from './ProductDetailModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();


  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setError('No products found in local storage.');
      }
    } catch {
      setError('Failed to load products from local storage.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSkeletonLoader = () => (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box
            sx={{ borderRadius: 4, p: 2, backgroundColor: '#f5f5f5', height: 350 }}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          px: 2,
          borderRadius: 4,
          mb: 4,
          minHeight: { xs: 150, sm: 200, md: 250 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={(theme) => ({
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
            color: '#d3d3d3',
          })}
        >
          Welcome to ShopSphere
        </Typography>
        <Typography
          variant="h6"
          sx={(theme) => ({
            mt: 1,
            fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' },
            color: '#505050', 
          })}
        >
          Explore the latest trends and find the best deals!
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
          position: 'relative',
        }}
      >
        <TextField
          placeholder="Search for products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: '#6a11cb' }} />,
          }}
          sx={{
            width: '100%',
            maxWidth: 600,
            bgcolor: 'white', 
            borderRadius: 3,
          }}
        />
      </Box>

      {loading ? (
        renderSkeletonLoader()
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6">
            No products found. Try a different search.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ pb: 12 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 4,
                  boxShadow: 5,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 200,
                    objectFit: 'contain',
                    backgroundColor: '#d3d3d3',
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    color: 'black', 
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    gutterBottom
                  >
                    {product.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          color: i < 4 ? '#FFD700' : '#E0E0E0',
                          fontSize: '20px',
                        }}
                      />
                    ))}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      (4.0)
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleProductClick(product)}
                    sx={{
                      textTransform: 'none',
                      width: '70%',
                      mx: 'auto',
                      display: 'block',
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        open={openModal}
        onClose={handleCloseModal}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default ProductList;
