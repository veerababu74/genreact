






// import React, { useContext, useEffect, useState } from "react";
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
// import { Adb as AdbIcon, Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "../themes/ThemeContext";

// const pages = ["Home", "Products", "Pricing", "Blog"];
// const afterlogeinpage = ["ok", "veera", "ok", "ok"];  // The items to show after login
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function ResponsiveAppBar() {
//     const [anchorElNav, setAnchorElNav] = useState(null);
//     const [anchorElUser, setAnchorElUser] = useState(null);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const { darkMode, toggleDarkMode } = useContext(ThemeContext);

//     useEffect(() => {
//         // Get user status from localStorage
//         const userStatus = localStorage.getItem("isLoggedIn");
//         const token = localStorage.getItem("token");
//         const verified = localStorage.getItem("is_verified");

//         // Only show logged-in state if all these conditions are met
//         if (userStatus === "true" && token && verified === "true") {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []); // Ensure this runs only once on mount

//     const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
//     const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

//     const handleCloseNavMenu = () => setAnchorElNav(null);
//     const handleCloseUserMenu = () => setAnchorElUser(null);

//     const handleLogin = (token, verified) => {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("token", token);
//         localStorage.setItem("is_verified", verified);
//         setIsLoggedIn(true); // Update state to reflect login status immediately
//     };

//     const handleLogout = () => {
//         // Clear localStorage and update login state
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("token");
//         localStorage.removeItem("is_verified");
//         setIsLoggedIn(false); // Update state to reflect logout status
//         handleCloseUserMenu();
//     };

//     return (
//         <AppBar position="static">
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     {/* Logo */}
//                     <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         component="a"
//                         href="/"
//                         sx={{
//                             mr: 2,
//                             display: { xs: "none", md: "flex" },
//                             fontFamily: "monospace",
//                             fontWeight: 700,
//                             letterSpacing: ".3rem",
//                             color: "inherit",
//                             textDecoration: "none",
//                         }}
//                     >
//                         LOGO
//                     </Typography>

//                     {/* Mobile Menu */}
//                     <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="menu"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                             keepMounted
//                             transformOrigin={{ vertical: "top", horizontal: "left" }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{ display: { xs: "block", md: "none" } }}
//                         >
//                             {pages.map((page) => (
//                                 <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page.toLowerCase()}`}>
//                                     <Typography>{page}</Typography>
//                                 </MenuItem>
//                             ))}
//                             {/* Show afterlogeinpage items only if logged in */}
//                             {isLoggedIn &&
//                                 afterlogeinpage.map((item) => (
//                                     <MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
//                                         <Typography>{item}</Typography>
//                                     </MenuItem>
//                                 ))}
//                         </Menu>
//                     </Box>

//                     {/* Desktop Menu */}
//                     <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//                         {pages.map((page) => (
//                             <Button
//                                 key={page}
//                                 component={Link}
//                                 to={`/${page.toLowerCase()}`}
//                                 sx={{ my: 2, color: "white", display: "block" }}
//                             >
//                                 {page}
//                             </Button>
//                         ))}
//                         {/* Show afterlogeinpage items only if logged in */}
//                         {isLoggedIn &&
//                             afterlogeinpage.map((item) => (
//                                 <Button
//                                     key={item}
//                                     component={Link}
//                                     to={`/${item.toLowerCase()}`}
//                                     sx={{ my: 2, color: "white", display: "block" }}
//                                 >
//                                     {item}
//                                 </Button>
//                             ))}
//                     </Box>

//                     {/* Dark Mode Toggle */}
//                     <Tooltip title="Toggle light/dark mode">
//                         <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 2 }}>
//                             {darkMode ? <Brightness7 /> : <Brightness4 />}
//                         </IconButton>
//                     </Tooltip>

//                     {/* User Menu */}
//                     <Box sx={{ flexGrow: 0 }}>
//                         {isLoggedIn ? (
//                             <>
//                                 <Tooltip title="Open settings">
//                                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                         <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Menu
//                                     id="menu-appbar"
//                                     anchorEl={anchorElUser}
//                                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                                     keepMounted
//                                     transformOrigin={{ vertical: "top", horizontal: "right" }}
//                                     open={Boolean(anchorElUser)}
//                                     onClose={handleCloseUserMenu}
//                                 >
//                                     {settings.map((setting) => (
//                                         <MenuItem
//                                             key={setting}
//                                             component={Link}
//                                             to={`/${setting.toLowerCase()}`}
//                                             onClick={() => {
//                                                 if (setting === "Logout") handleLogout();
//                                                 else handleCloseUserMenu();
//                                             }}
//                                         >
//                                             <Typography>{setting}</Typography>
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </>
//                         ) : (
//                             <Box sx={{ display: "flex" }}>
//                                 <Button color="inherit" component={Link} to="/login">
//                                     Login
//                                 </Button>
//                                 <Button color="inherit" component={Link} to="/signup">
//                                     Register
//                                 </Button>
//                             </Box>
//                         )}
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }

// export default ResponsiveAppBar;


import React, { useContext, useEffect, useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import { Adb as AdbIcon, Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";
import { useNavigate } from 'react-router-dom';
const pages = ["Home", "Products", "Pricing", "Blog"];
const afterlogeinpage = ["fe1", "veera", "fe2", "fe3"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({ isLoggedIn, setIsLoggedIn }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const navigate = useNavigate();
    const handleLogin = (token, verified) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("is_verified", verified);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("is_verified");
        setIsLoggedIn(false);
        handleCloseUserMenu();
        // Navigate to the login page after a small delay to ensure state update
        setTimeout(() => {
            navigate('/login');
        }, 0);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none" }}>
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" } }}>
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page.toLowerCase()}`}>
                                    <Typography>{page}</Typography>
                                </MenuItem>
                            ))}
                            {isLoggedIn && afterlogeinpage.map((item) => (
                                <MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
                                    <Typography>{item}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button key={page} component={Link} to={`/${page.toLowerCase()}`} sx={{ my: 2, color: "white", display: "block" }}>
                                {page}
                            </Button>
                        ))}
                        {isLoggedIn && afterlogeinpage.map((item) => (
                            <Button key={item} component={Link} to={`/${item.toLowerCase()}`} sx={{ my: 2, color: "white", display: "block" }}>
                                {item}
                            </Button>
                        ))}
                    </Box>

                    <Tooltip title="Toggle light/dark mode">
                        <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 2 }}>
                            {darkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} component={Link} to={`/${setting.toLowerCase()}`} onClick={() => { if (setting === "Logout") handleLogout(); else handleCloseUserMenu(); }}>
                                            <Typography>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{ display: "flex" }}>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Register</Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;




