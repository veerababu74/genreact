import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import API_BASE_URL from '../apiConfig';

const BASE_URL = API_BASE_URL; // Replace with your actual base URL




function ResetPassword() {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${BASE_URL}/reset_password/${token}`,
                { password, confirm_password: confirmPassword }
            );
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Redirect to login page after success
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Something went wrong');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisibility((prevState) => !prevState);
    };

    const handleConfirmPasswordVisibilityToggle = () => {
        setConfirmPasswordVisibility((prevState) => !prevState);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
                        type={passwordVisibility ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePasswordVisibilityToggle}
                                        edge="end"
                                    >
                                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type={confirmPasswordVisibility ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleConfirmPasswordVisibilityToggle}
                                        edge="end"
                                    >
                                        {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </Button>
                </form>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default ResetPassword;
