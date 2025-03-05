// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const userStatus = localStorage.getItem("isLoggedIn");
//         const token = localStorage.getItem("token");
//         const verified = localStorage.getItem("is_verified");

//         if (userStatus === "true" && token && verified === "true") {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsContextLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsContextLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
