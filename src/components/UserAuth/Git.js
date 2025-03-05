import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GithubLogin = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const username = urlParams.get("username");

        if (token) {
            // Update local storage
            localStorage.setItem('token', token);
            localStorage.setItem('is_verified', 'true');
            localStorage.setItem('isLoggedIn', 'true');

            // Update app state immediately
            setIsLoggedIn(true);

            // Navigate to dashboard
            navigate("/dashboard");
        } else {
            console.error("GitHub login failed");
            navigate("/login");
        }
    }, [navigate, setIsLoggedIn]);

    return <div>Processing GitHub login...</div>;
};

export default GithubLogin;
