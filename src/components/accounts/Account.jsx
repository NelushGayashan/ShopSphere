// src/components/accounts/Account.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const user = useSelector((state) => state.auth.user); 
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: '#f4f6f8' }}>
        <Paper elevation={6} sx={{ padding: 4, maxWidth: 500, textAlign: 'center', borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" color="textSecondary" paragraph sx={{ fontWeight: '500' }}>
            Please log in to view your account details.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{
              marginTop: 2,
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column" 
      sx={{ padding: 4, minHeight: '100vh' }}
    >
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        sx={{ marginTop: -50, color: '#d3d3d3', fontFamily: '"Roboto", sans-serif' }}
      >
        Account Details
      </Typography>

      <Card 
        sx={{
          width: '100%', 
          maxWidth: 600, 
          borderRadius: 3, 
          boxShadow: 9, 
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          ':hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <CardContent>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ color: '#34495e' }}
          >
            User Information
          </Typography>

          <Typography 
            variant="body1" 
            gutterBottom 
            sx={{ color: '#7f8c8d', fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            <strong>Name:</strong> {user.name}
          </Typography>

          <Typography 
            variant="body1" 
            gutterBottom 
            sx={{ color: '#7f8c8d', fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            <strong>Email:</strong> {user.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Account;
