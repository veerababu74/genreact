import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user on app load
        const token = localStorage.getItem("token");
        if (token) {
            const userData = JSON.parse(atob(token.split(".")[1]));
            setUser(userData);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
