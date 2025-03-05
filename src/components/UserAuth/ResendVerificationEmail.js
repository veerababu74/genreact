import React, { useState } from 'react';
import { Button, Snackbar, Alert, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import
import API_BASE_URL from '../apiConfig';

const BASE_URL = API_BASE_URL; // Replace with your actual base URL
const ResendVerificationEmail = ({ email }) => {
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const navigate = useNavigate();

    const handleResendVerification = async () => {
        setLoading(true);

        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            setSnackbarMessage('No token found. Please log in again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setLoading(false);
            navigate('/login');  // Redirect to login page if token is not found
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/resend_verification_email`,
                { email: email },  // Send the email as a request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
                    },
                }
            );
            setSnackbarMessage(response.data.message || 'Verification email sent!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setSnackbarMessage('Unauthorized. Please log in again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                navigate('/login');  // Redirect to login if token is invalid or expired
            } else {
                setSnackbarMessage(error.response?.data?.message || 'Failed to resend email');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleRedirectToLogin = () => {
        // Redirect to login page using navigate
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
                <Typography variant="h6" gutterBottom>
                    Didn't receive the verification email? Click below to resend.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResendVerification}
                    disabled={loading}
                    sx={{ marginTop: 2 }}
                >
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                </Button>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">
                        If you still haven't received it, check your spam folder.
                    </Typography>
                    <Button variant="text" onClick={handleRedirectToLogin} sx={{ marginTop: 1 }}>
                        Go to Login
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ResendVerificationEmail;
