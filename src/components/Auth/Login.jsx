// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
              <Typography variant="body2">Welcome Back!</Typography>
            </Box>
          </Box>

          {/* Divider line in the middle */}
          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(0, 0, 0, 0.12)' }} />

          {/* Right Section for Login Form */}
          <Box sx={{ flex: 1, padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: '500' }}>
              Log In
            </Typography>
            <Formik
              initialValues={{ email: '', password: '', rememberMe: false }}
              validationSchema={Yup.object({
                email: Yup.string().required('Required'),
                password: Yup.string().required('Required'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                try {
                  await dispatch(login(values));
                  toast.success('Login Successful!');
                  navigate('/');
                } catch (error) {
                  toast.error(error.message || 'Invalid credentials!');
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
                    <FormControlLabel
                      control={<Field name="rememberMe" as={Checkbox} />}
                      label="Remember Me"
                      sx={{ color: '#2196F3' }}
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
                    {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Log In'}
                  </Button>
                  <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Typography variant="body2">
                      Don't have an account?{' '}
                      <Link to="/register" style={{ color: '#2196F3', textDecoration: 'none' }}>
                        Register
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

export default Login;
