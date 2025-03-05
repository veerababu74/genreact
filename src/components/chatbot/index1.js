import { ThemeContext } from "../themes/ThemeContext";
import React, { useState, useRef, useEffect, useContext } from "react";
import {
    Box,
    TextField,
    Button,
    IconButton,
    Typography,
    Paper,
    Avatar,
} from "@mui/material";
import { Mic, Send } from "@mui/icons-material";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    // Access the current theme state
    const { darkMode } = useContext(ThemeContext);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: "user" },
            ]);
            setInput("");
            // Simulate bot response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "This is a bot response.", sender: "bot" },
                ]);
            }, 1000);
        }
    };

    const handleMicPress = () => {
        setIsListening(true);
        console.log("Listening...");
    };

    const handleMicRelease = () => {
        setIsListening(false);
        console.log("Stopped listening.");
    };

    // Handle the Enter key for sending messages
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents default newline on Enter
            handleSendMessage();
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the messages list when a new message is added
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        // Disable ResizeObserver notifications to prevent potential issues
        const observer = new ResizeObserver(() => { });
        observer.observe(document.body);
        return () => observer.disconnect();
    }, []);

    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: "80vw", // Make the chatbot take up more width
                height: "90vh", // Increase height for more space
                margin: "20px auto",
                borderRadius: "12px",
                overflow: "hidden",
                bgcolor: darkMode ? "background.paper" : "background.default", // Use dynamic background
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    textAlign: "center",
                    py: 2,
                    fontWeight: "bold",
                    fontSize: "18px",
                }}
            >
                Chatbot
            </Box>

            {/* Messages */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    overflowY: "auto",
                    bgcolor: "background.default",
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent:
                                message.sender === "user" ? "flex-end" : "flex-start",
                            mb: 1,
                        }}
                    >
                        {message.sender === "bot" && (
                            <Avatar sx={{ mr: 1, fontSize: "24px" }}>
                                🤖
                            </Avatar> // Robot emoji for bot
                        )}
                        <Typography
                            sx={{
                                maxWidth: "70%",
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor:
                                    message.sender === "user"
                                        ? "primary.main"
                                        : darkMode
                                            ? "#333" // Dark background for bot response in dark mode
                                            : "grey.300", // Light background for bot response in light mode
                                color:
                                    message.sender === "user"
                                        ? "#fff"
                                        : darkMode
                                            ? "#e0e0e0"
                                            : "#000",
                                textAlign: message.sender === "user" ? "right" : "left",
                                wordWrap: "break-word", // Prevent text from overflowing
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {message.text}
                        </Typography>
                        {message.sender === "user" && (
                            <Avatar sx={{ ml: 1, fontSize: "24px" }}>
                                👤
                            </Avatar> // Human emoji for user
                        )}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start", // Align input and button to the top
                    p: 2,
                    borderTop: "1px solid #ddd",
                    bgcolor: "background.paper",
                }}
            >
                <TextField
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress} // Add the keydown event to handle Enter key
                    placeholder="Type a message..."
                    variant="outlined"
                    multiline
                    minRows={1}
                    maxRows={3} // Set max height to 3 rows
                    fullWidth
                    sx={{ mr: 1 }}
                />
                <IconButton
                    color={isListening ? "primary" : "default"}
                    onMouseDown={handleMicPress}
                    onMouseUp={handleMicRelease}
                >
                    <Mic />
                </IconButton>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Send />}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </Box>
        </Paper>
    );
};

export default Chatbot;



