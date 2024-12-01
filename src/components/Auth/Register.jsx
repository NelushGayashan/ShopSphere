// src/components/Auth/Register.jsx

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { register } from '../../store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 16 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: '#f4f4f4' }}>
          {/* Left Section for App Name */}
          <Box sx={{ flex: 1, padding: '20px' }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#2196F3',
                textAlign: 'center',
                letterSpacing: 2,
              }}
            >
              ShopSphere
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                marginBottom: '30px',
                fontWeight: '300',
              }}
            >
              The Best Place to Shop Online
            </Typography>
            <Box sx={{ textAlign: 'center', color: '#2196F3' }}>
              <Typography variant="body2">Join Us Today!</Typography>
            </Box>
          </Box>

          {/* Divider line in the middle */}
          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(0, 0, 0, 0.12)' }} />

          {/* Right Section for Register Form */}
          <Box sx={{ flex: 1, padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: '500' }}>
              Create an Account
            </Typography>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .required('Required')
                  .min(5, 'Name must be at least 5 characters'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                  .min(8, 'Password must be at least 8 characters')
                  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
                  .matches(/[0-9]/, 'Password must contain at least one number')
                  .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
                  .required('Required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm password is required'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                try {
                  await dispatch(register(values));
                  toast.success('Registration Successful!');
                  navigate('/login');
                } catch (error) {
                  toast.error(error.message);
                } finally {
                  setLoading(false);
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                  <Box mb={3}>
                    <Field
                      name="name"
                      as={TextField}
                      label="Name"
                      fullWidth
                      variant="outlined"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{
                        borderRadius: '30px',
                        '& .MuiInputBase-root': {
                          borderRadius: '30px',
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          borderColor: '#2196F3',
                        },
                      }}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        borderRadius: '30px',
                        '& .MuiInputBase-root': {
                          borderRadius: '30px',
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          borderColor: '#2196F3',
                        },
                      }}
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="password"
                      as={TextField}
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      fullWidth
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPasswordToggle} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        borderRadius: '30px',
                        '& .MuiInputBase-root': {
                          borderRadius: '30px',
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          borderColor: '#2196F3',
                        },
                      }}                      
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      name="confirmPassword"
                      as={TextField}
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      fullWidth
                      variant="outlined"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowConfirmPasswordToggle} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        borderRadius: '30px',
                        '& .MuiInputBase-root': {
                          borderRadius: '30px',
                        },
                        '& .MuiOutlinedInput-root:hover': {
                          borderColor: '#2196F3',
                        },
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      borderRadius: '30px',
                      background: loading
                        ? 'rgba(33, 150, 243, 0.5)'
                        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                        boxShadow: '0 6px 15px rgba(33, 150, 243, 0.4)',
                      },
                    }}
                    disabled={isSubmitting || loading}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Register'}
                  </Button>
                  {/* Log In link below the register button */}
                  <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Typography variant="body2">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: '#2196F3', textDecoration: 'none' }}>
                        Log In Here
                      </Link>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
