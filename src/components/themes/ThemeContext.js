// import React, { createContext, useMemo, useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// export const ThemeContext = createContext();

// const ThemeContextProvider = ({ children }) => {
//     const [darkMode, setDarkMode] = useState(
//         localStorage.getItem("darkMode") === "true" || false
//     );

//     const toggleDarkMode = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         localStorage.setItem("darkMode", newMode);
//     };

//     const theme = useMemo(
//         () =>
//             createTheme({
//                 palette: {
//                     mode: darkMode ? "dark" : "light",
//                 },
//             }),
//         [darkMode]
//     );

//     return (
//         <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//             <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                 {children}
//             </ThemeProvider>
//         </ThemeContext.Provider>
//     );
// };

// export default ThemeContextProvider;


import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true" || false
    );

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                    primary: {
                        main: "#1976d2", // Replace with your desired primary color
                    },
                    secondary: {
                        main: "#f50057", // Replace with your desired secondary color
                    },
                },
            }),
        [darkMode]
    );

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;

