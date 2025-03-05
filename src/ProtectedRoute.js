import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

    if (!isLoggedIn) {
        return <Navigate to="/login" />; // Redirect to login page if not logged in
    }

    return children; // If logged in, render the protected content
};

export default ProtectedRoute;
