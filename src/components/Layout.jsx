// src/components/Layout.jsx
import React from 'react';
import PropTypes from 'prop-types'; 
import { Container, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer'; 

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen"> {/* Add flex container with min-h-screen */}
    {/* Persistent Header */}
    <Header />
    
    {/* Page Content */}
    <Box component="main" sx={{ marginTop: '64px', flex: 1 }}> {/* Add flex: 1 to allow content to grow */}
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>

    {/* Footer */}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default Layout;
