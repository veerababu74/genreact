import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    Box,
    Paper,
    Drawer,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Avatar,
    Divider,
    CircularProgress
} from '@mui/material';
import { Send, Mic, Menu, Close, Delete, Person, SmartToy, Add } from '@mui/icons-material';
import { ThemeContext } from '../themes/ThemeContext';
import API_BASE_URL from '../apiConfig';

const BASE_URL = API_BASE_URL;

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const { darkMode } = useContext(ThemeContext);
    const [inputRows, setInputRows] = useState(1);
    const textFieldRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatSessions, setChatSessions] = useState({});
    const [username, setUsername] = useState(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.username || 'User';
        } catch (error) {
            console.error('Error parsing user data:', error);
            return 'User';
        }
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Fetch conversations when component mounts
        fetchConversations();
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        const handleUserUpdate = () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.username) {
                    setUsername(user.username);
                }
            } catch (error) {
                console.error('Error updating username:', error);
            }
        };

        // Initial check
        handleUserUpdate();

        // Listen for storage changes
        window.addEventListener('storage', handleUserUpdate);

        // Cleanup listener
        return () => window.removeEventListener('storage', handleUserUpdate);
    }, []);

    useEffect(() => {
        console.log('Current username:', username);
    }, [username]);

    const fetchConversations = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/conversations`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setConversations(data);

                // Get last active conversation from localStorage
                const lastActiveConversationId = localStorage.getItem('lastActiveConversationId');
                if (lastActiveConversationId) {
                    const lastConversation = data.find(conv => conv.id === parseInt(lastActiveConversationId));
                    if (lastConversation) {
                        handleSelectConversation(lastConversation);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const handleNewConversation = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/create_conversation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const newConversation = { id: data.conversation_id, title: data.title };
                setConversations(prev => [newConversation, ...prev]);
                setCurrentConversation(newConversation);
                setMessages([]);
                setChatSessions(prev => ({
                    ...prev,
                    [data.conversation_id]: []
                }));
            }
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const handleDeleteConversation = async (e, conversationId) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this conversation?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/delete_conversation/${conversationId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    // Remove conversation from all states
                    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
                    setChatSessions(prev => {
                        const newSessions = { ...prev };
                        delete newSessions[conversationId];
                        return newSessions;
                    });

                    if (currentConversation?.id === conversationId) {
                        setCurrentConversation(null);
                        setMessages([]);
                        localStorage.removeItem('lastActiveConversationId');
                    }
                }
            } catch (error) {
                console.error('Error deleting conversation:', error);
            }
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);
        setError(null);

        // If this is a new conversation or first message, use it as title
        const isFirstMessage = !currentConversation ||
            (currentConversation && messages.length === 0);

        // Add user message immediately
        const newUserMessage = {
            content: userMessage,
            role: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            const response = await fetch(`${BASE_URL}/api/get_response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversation_id: currentConversation?.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            // Update conversation title if it's the first message
            if (isFirstMessage) {
                const title = userMessage.length > 30 ?
                    `${userMessage.substring(0, 30)}...` :
                    userMessage;

                if (currentConversation) {
                    // Update existing conversation title
                    await updateConversationTitle(currentConversation.id, title);
                    setConversations(prev => prev.map(conv =>
                        conv.id === currentConversation.id ?
                            { ...conv, title } :
                            conv
                    ));
                }
            }

            // Add bot response
            const botMessage = {
                content: data.response,
                role: 'ai',
                timestamp: new Date()
            };
            const newMessages = [
                ...messages,
                { role: 'user', content: userMessage },
                { role: 'ai', content: data.response }
            ];

            // Update both current messages and chat sessions
            setMessages(newMessages);
            if (currentConversation) {
                setChatSessions(prev => ({
                    ...prev,
                    [currentConversation.id]: newMessages
                }));
            }

            // Handle new conversation creation
            if (!currentConversation) {
                const newConv = {
                    id: data.conversation_id,
                    title: userMessage.slice(0, 30) + '...'
                };
                setCurrentConversation(newConv);
                setConversations(prev => [newConv, ...prev]);

                // Initialize chat session for new conversation
                setChatSessions(prev => ({
                    ...prev,
                    [data.conversation_id]: newMessages
                }));

                updateConversationTitle(data.conversation_id, userMessage.slice(0, 30) + '...');
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Failed to get response. Please try again.');
            // Add error message to chat
            setMessages(prev => [...prev, {
                content: "I apologize, but I'm having trouble responding right now. Please try again.",
                role: 'ai',
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);

        // Calculate needed rows based on content
        const textArea = e.target;
        const lineHeight = 20; // approximate line height in pixels
        const minRows = 1;
        const maxRows = 5;

        const previousRows = textArea.rows;
        textArea.rows = minRows; // Reset rows to measure scrollHeight

        const currentRows = Math.floor(textArea.scrollHeight / lineHeight);

        if (currentRows === previousRows) {
            textArea.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            textArea.rows = maxRows;
            textArea.scrollTop = textArea.scrollHeight;
        }

        setInputRows(Math.min(currentRows, maxRows));
    };

    const handleSelectConversation = async (conversation) => {
        try {
            const response = await fetch(`${BASE_URL}/api/conversation/${conversation.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentConversation(data.conversation);

                // Store messages in chatSessions
                setChatSessions(prev => ({
                    ...prev,
                    [conversation.id]: data.messages
                }));

                // Set current messages
                setMessages(data.messages);

                // Save active conversation ID to localStorage
                localStorage.setItem('lastActiveConversationId', conversation.id.toString());
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    const updateConversationTitle = async (conversationId, title) => {
        try {
            await fetch(`${BASE_URL}/api/update_title`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    conversation_id: conversationId,
                    title: title
                })
            });
        } catch (error) {
            console.error('Error updating title:', error);
        }
    };

    useEffect(() => {
        if (currentConversation && chatSessions[currentConversation.id]) {
            setMessages(chatSessions[currentConversation.id]);
        }
    }, [currentConversation?.id]);

    useEffect(() => {
        return () => {
            // Clean up function
            if (currentConversation) {
                localStorage.setItem('lastActiveConversationId', currentConversation.id.toString());
            }
        };
    }, [currentConversation]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            height: 'calc(100vh - 64px)',
            bgcolor: darkMode ? '#121212' : '#f5f5f5',
            position: 'relative'
        }}>
            {/* Sidebar Drawer */}
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                sx={{
                    width: isSidebarOpen ? 240 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        bgcolor: darkMode ? '#1e1e1e' : '#fff',
                        borderRight: '1px solid',
                        borderColor: 'divider'
                    }
                }}
            >
                <Box sx={{ width: 240 }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Conversations</Typography>
                        <IconButton onClick={() => setIsSidebarOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        px: 2,
                        my: 1
                    }}>
                        <Button
                            startIcon={<Add />}
                            fullWidth
                            variant="contained"
                            onClick={handleNewConversation}
                            sx={{
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.dark'
                                },
                                maxWidth: '200px', // Control maximum width
                                minWidth: '160px'  // Control minimum width
                            }}
                        >
                            New Chat
                        </Button>
                    </Box>
                    <List>
                        {conversations.map((conv) => (
                            <ListItem
                                key={conv.id}
                                onClick={() => handleSelectConversation(conv)}
                                sx={{
                                    cursor: 'pointer',
                                    py: 1,
                                    px: 2,
                                    '&:hover': {
                                        bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                                    },
                                    bgcolor: currentConversation?.id === conv.id ?
                                        (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)') :
                                        'transparent'
                                }}
                            >
                                <Typography
                                    sx={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {conv.title || 'New Chat'}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={(e) => handleDeleteConversation(e, conv.id)}
                                    sx={{
                                        ml: 1,
                                        '&:hover': {
                                            color: 'error.main'
                                        }
                                    }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Chat Area */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                width: {
                    xs: '100%',
                    md: isSidebarOpen ? 'calc(100% - 240px)' : '100%'
                },
                transition: 'width 0.3s ease'
            }}>
                {/* Messages Container */}
                <Box sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    mb: `${Math.max(64 + (inputRows - 1) * 20, 64)}px`, // Dynamic bottom margin
                }}>
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                                alignItems: 'flex-start',
                                gap: 1,
                                mb: 2
                            }}
                        >
                            {/* Avatar/Icon */}
                            <Avatar
                                sx={{
                                    bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                                    width: 32,
                                    height: 32
                                }}
                            >
                                {message.role === 'user' ? <Person /> : <SmartToy />}
                            </Avatar>

                            {/* Message content */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '70%'
                            }}>
                                {/* Sender name */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mb: 0.5,
                                        color: 'text.secondary',
                                        textAlign: message.role === 'user' ? 'right' : 'left'
                                    }}
                                >
                                    {message.role === 'user' ? username : 'AI Assistant'}
                                </Typography>

                                {/* Message bubble */}
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        bgcolor: message.isError ? 'error.light' :
                                            message.role === 'user' ? 'primary.main' :
                                                darkMode ? 'grey.800' : 'grey.100',
                                        color: message.role === 'user' ? 'white' :
                                            darkMode ? 'grey.100' : 'text.primary',
                                        borderRadius: 2
                                    }}
                                >
                                    <Typography>{message.content}</Typography>
                                </Paper>
                            </Box>
                        </Box>
                    ))}
                    {isLoading && (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            ml: 4
                        }}>
                            <Avatar
                                sx={{
                                    bgcolor: 'secondary.main',
                                    width: 32,
                                    height: 32
                                }}
                            >
                                <SmartToy />
                            </Avatar>
                            <CircularProgress size={20} />
                        </Box>
                    )}
                </Box>

                {/* Input Container */}
                <Box
                    component="form"
                    onSubmit={handleSendMessage}
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        width: {
                            xs: '100%',
                            md: isSidebarOpen ? 'calc(100% - 240px)' : '100%'
                        },
                        p: 2,
                        bgcolor: darkMode ? '#1e1e1e' : '#fff',
                        borderTop: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        gap: 1,
                        transition: 'all 0.3s ease',
                        zIndex: 1000,
                        minHeight: 64,
                        alignItems: 'flex-end' // Align items to bottom
                    }}
                >
                    <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        sx={{ flexShrink: 0, mb: 0.5 }} // Add margin bottom to align with input
                    >
                        <Menu />
                    </IconButton>
                    <TextField
                        multiline
                        maxRows={5}
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        ref={textFieldRef}
                        sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: darkMode ? '#2d2d2d' : '#fff',
                                transition: 'height 0.3s ease',
                            },
                            '& .MuiInputBase-multiline': {
                                maxHeight: '120px', // Maximum height
                                overflowY: 'auto'   // Enable scrolling if content exceeds max height
                            }
                        }}
                    />
                    <IconButton
                        type="submit"
                        color="primary"
                        disabled={isLoading || !input.trim()}
                        sx={{ flexShrink: 0, mb: 0.5 }} // Add margin bottom to align with input
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Chatbot;