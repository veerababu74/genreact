import React, { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Button,
    Tooltip,
    Box
} from "@mui/material";
import {
    Adb as AdbIcon,
    Brightness4,
    Brightness7,
    Menu as MenuIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../themes/ThemeContext";

const ResponsiveAppBar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const pages = ["Home", "Products", "Pricing", "Blog"];
    const afterLoginPages = ["Dashboard", "Profile", "Chat"];
    const userMenuOptions = ["Profile", "Account", "Dashboard", "Logout"];

    const handleNavMenuOpen = (event) => setAnchorElNav(event.currentTarget);
    const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget);
    const handleNavMenuClose = () => setAnchorElNav(null);
    const handleUserMenuClose = () => setAnchorElUser(null);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
        handleUserMenuClose();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleNavMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleNavMenuClose}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleNavMenuClose} component={Link} to={`/${page.toLowerCase()}`}>
                                    <Typography>{page}</Typography>
                                </MenuItem>
                            ))}
                            {isLoggedIn &&
                                afterLoginPages.map((page) => (
                                    <MenuItem key={page} onClick={handleNavMenuClose} component={Link} to={`/${page.toLowerCase()}`}>
                                        <Typography>{page}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                        {isLoggedIn &&
                            afterLoginPages.map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page}
                                </Button>
                            ))}
                    </Box>

                    {/* Theme Toggle */}
                    <Tooltip title="Toggle light/dark mode">
                        <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 2 }}>
                            {darkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    keepMounted
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleUserMenuClose}
                                >
                                    {userMenuOptions.map((option) => (
                                        <MenuItem
                                            key={option}
                                            onClick={() => {
                                                if (option === "Logout") handleLogout();
                                                else handleUserMenuClose();
                                            }}
                                            component={Link}
                                            to={`/${option.toLowerCase()}`}
                                        >
                                            <Typography>{option}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{ display: "flex" }}>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Register
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;