
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
    return (
        <AppBar position="static" color="primary" sx={{ mt: 5 }}>
            <Toolbar>
                <Typography variant="body1" align="center" sx={{ flexGrow: 1 }}>
                    &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
