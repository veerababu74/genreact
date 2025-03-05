

// // export default Signup;
// import React, { useState } from 'react';
// import { Box, Container, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
// import { Google, GitHub, LinkedIn } from '@mui/icons-material';
// import axios from 'axios';

// function Signup() {
//     const [message, setMessage] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//     const handleGoogleSignup = () => {
//         window.location.href = 'https://your-backend-url/auth/google'; // Replace with your backend Google auth endpoint
//     };

//     const handleGithubLogin = () => {
//         window.location.href = "http://127.0.0.1:5000/login/github";
//     };

//     const handleLinkedinSignup = () => {
//         window.location.href = 'https://your-backend-url/auth/linkedin'; // Replace with your backend LinkedIn auth endpoint
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); // Start loading animation

//         const formData = new FormData(e.target);
//         const data = {
//             username: formData.get("username"),
//             email: formData.get("email"),
//             password: formData.get("password"),
//             confirm_password: formData.get("confirm_password"),
//             firstname: formData.get("firstname"),
//             lastname: formData.get("lastname"),
//         };

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/register', data); // Replace with your backend URL
//             if (response.status === 201) {
//                 setMessage(response.data.message);
//                 setSnackbarSeverity('success');
//                 setSnackbarMessage('Registration successful! Please check your email to verify your account.');
//             }
//         } catch (err) {
//             setError(err.response?.data?.error || 'An error occurred');
//             setSnackbarSeverity('error');
//             setSnackbarMessage(err.response?.data?.error || 'An error occurred');
//         } finally {
//             // Delay the display of Snackbar to create animation effect
//             setTimeout(() => {
//                 setSnackbarOpen(true);
//                 setLoading(false); // Stop loading animation
//             }, 2000);
//         }
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     Signup
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="First Name"
//                                 name="firstname"
//                                 variant="outlined"
//                                 margin="normal"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Last Name"
//                                 name="lastname"
//                                 variant="outlined"
//                                 margin="normal"
//                             />
//                         </Grid>
//                     </Grid>
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         type="email"
//                         variant="outlined"
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         fullWidth
//                         label="Username"
//                         name="username"
//                         variant="outlined"
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         fullWidth
//                         label="Password"
//                         name="password"
//                         type="password"
//                         variant="outlined"
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         fullWidth
//                         label="Confirm Password"
//                         name="confirm_password"
//                         type="password"
//                         variant="outlined"
//                         margin="normal"
//                         required
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 2, mb: 2 }}
//                         disabled={loading}
//                     >
//                         {loading ? 'Signing Up...' : 'Signup'}
//                     </Button>
//                 </form>

//                 <Typography variant="body1" align="center" gutterBottom>
//                     Or signup with:
//                 </Typography>

//                 <Grid container spacing={2}>
//                     <Grid item xs={4}>
//                         <Button
//                             fullWidth
//                             variant="outlined"
//                             startIcon={<Google />}
//                             onClick={handleGoogleSignup}
//                         >
//                             Google
//                         </Button>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <Button
//                             fullWidth
//                             variant="outlined"
//                             startIcon={<GitHub />}
//                             onClick={handleGithubLogin}
//                         >
//                             GitHub
//                         </Button>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <Button
//                             fullWidth
//                             variant="outlined"
//                             startIcon={<LinkedIn />}
//                             onClick={handleLinkedinSignup}
//                         >
//                             LinkedIn
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Box>

//             {/* Snackbar for registration status */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// }

// export default Signup;
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Google, GitHub, LinkedIn } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const BASE_URL = API_BASE_URL; // Replace with your actual base URL
function Signup() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        firstname: '',
        lastname: '',
    });

    const handleGoogleSignup = () => {
        window.location.href = 'https://your-backend-url/auth/google'; // Replace with your backend Google auth endpoint
    };

    const handleGithubLogin = () => {
        window.location.href = `${BASE_URL}/login/github`;
    };

    const handleLinkedinSignup = () => {
        window.location.href = 'https://your-backend-url/auth/linkedin'; // Replace with your backend LinkedIn auth endpoint
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisibility((prevState) => !prevState);
    };

    const handleConfirmPasswordVisibilityToggle = () => {
        setConfirmPasswordVisibility((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation

        try {
            const response = await axios.post(`${BASE_URL}/register`, formData); // Replace with your backend URL
            if (response.status === 201) {
                setMessage(response.data.message);
                setSnackbarSeverity('success');
                setSnackbarMessage('Registration successful! Please check your email to verify your account.');

                // Clear form fields after successful submission
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    firstname: '',
                    lastname: '',
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            setSnackbarSeverity('error');
            setSnackbarMessage(err.response?.data?.error || 'An error occurred');
        } finally {
            // Delay the display of Snackbar to create animation effect
            setTimeout(() => {
                setSnackbarOpen(true);
                setLoading(false); // Stop loading animation
            }, 2000);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Signup
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstname"
                                variant="outlined"
                                margin="normal"
                                required
                                value={formData.firstname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastname"
                                variant="outlined"
                                margin="normal"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={passwordVisibility ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
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
                        fullWidth
                        label="Confirm Password"
                        name="confirm_password"
                        type={confirmPasswordVisibility ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.confirm_password}
                        onChange={handleInputChange}
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
                        sx={{ mt: 2, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Signup'}
                    </Button>
                </form>

                <Typography variant="body1" align="center" gutterBottom>
                    Or signup with:
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Google />}
                            onClick={handleGoogleSignup}
                        >
                            Google
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GitHub />}
                            onClick={handleGithubLogin}
                        >
                            GitHub
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LinkedIn />}
                            onClick={handleLinkedinSignup}
                        >
                            LinkedIn
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Snackbar for registration status */}
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
}

export default Signup;
