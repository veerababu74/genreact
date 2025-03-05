import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton as MuiIconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ResendVerificationEmail from './ResendVerificationEmail';
import API_BASE_URL from '../apiConfig';

const BASE_URL = API_BASE_URL; // Replace with your actual base URL

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [isVerified, setIsVerified] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Show/hide password state
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        const verifiedStatus = localStorage.getItem('is_verified') === 'true'; // Convert to boolean

        if (userToken) {
            setIsVerified(verifiedStatus);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                identifier: email,
                password,
            });
            const { token, is_verified } = response.data;

            if (!is_verified) {
                // Show verification dialog first
                setOpenDialog(true);
                setSnackbarMessage('Please verify your email');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
                // Store email for resend verification
                localStorage.setItem('pendingVerificationEmail', email);
                setLoading(false);
                return; // Don't proceed with login
            }

            // If verified, proceed with login
            localStorage.setItem('token', token);
            localStorage.setItem('is_verified', is_verified.toString());
            setIsLoggedIn(true);
            setSnackbarMessage('Login successful');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/dashboard');
        } catch (error) {
            setSnackbarMessage(error.response?.data?.error || 'Invalid credentials');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}/request_password_reset`, { email });
            setSnackbarMessage(response.data.message || 'Password reset link sent!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Failed to send reset link.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            setForgotPasswordDialog(false);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);
    const handleDialogClose = () => setOpenDialog(false);

    const handleGithubLogin = () => {
        window.location.href = `${BASE_URL}/login/github`;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MuiIconButton
                                        onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </MuiIconButton>
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
                        {loading ? 'Logging In...' : 'Log In'}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                        </Typography>
                        <Button
                            onClick={() => setForgotPasswordDialog(true)}
                            color="primary"
                            sx={{ textTransform: 'none' }}
                        >
                            Forgot Password?
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            Login with
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton color="primary" onClick={() => console.log('Google Login')} sx={{ margin: 1 }}>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleGithubLogin} sx={{ margin: 1 }}>
                                <GitHubIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log('LinkedIn Login')} sx={{ margin: 1 }}>
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </form>
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
            <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        padding: '20px',
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <EmailIcon />
                        <Typography variant="h6" component="span">
                            Email Verification
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#1976d2',
                                marginBottom: 2,
                                fontWeight: 500
                            }}
                        >
                            One Last Step!
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            We've sent a verification email to:
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1976d2'
                            }}
                        >
                            {email}
                        </Typography>
                    </Box>

                    <Box sx={{
                        backgroundColor: '#f5f5f5',
                        padding: 3,
                        borderRadius: 2,
                        width: '100%'
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                marginBottom: 2
                            }}
                        >
                            📧 Check your inbox for the verification link
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                marginBottom: 1
                            }}
                        >
                            ⚠️ Can't find the email?
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            • Check your spam folder<br />
                            • Make sure the email address is correct<br />
                            • Click the resend button below
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <ResendVerificationEmail email={email} />
                    <Button
                        onClick={handleDialogClose}
                        variant="outlined"
                        fullWidth
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={forgotPasswordDialog} onClose={() => setForgotPasswordDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Password Reset</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setForgotPasswordDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleForgotPassword(email)} color="primary" disabled={!email.trim()}>
                        Send Reset Link
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Login;
