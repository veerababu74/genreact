import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Footer from './Footer';

function Home() {
    const cards = [
        { title: "Feature 1", description: "Description of feature 1", image: "/images/card1.jpg" },
        { title: "Feature 2", description: "Description of feature 2", image: "/images/card2.jpg" },
        { title: "Feature 3", description: "Description of feature 3", image: "/images/card3.jpg" },
        { title: "Feature 3", description: "Description of feature 3", image: "/images/card3.jpg" },
        { title: "Feature 3", description: "Description of feature 3", image: "/images/card3.jpg" },
        { title: "Feature 3", description: "Description of feature 3", image: "/images/card3.jpg" },

    ];

    const socialMediaLinks = [
        { icon: <Facebook />, link: "https://facebook.com" },
        { icon: <Twitter />, link: "https://twitter.com" },
        { icon: <Instagram />, link: "https://instagram.com" },
        { icon: <LinkedIn />, link: "https://linkedin.com" },
    ];

    return (
        <Box>
            {/* Cards Section */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Our Features
                </Typography>
                <Grid container spacing={4}>
                    {cards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.image}
                                    alt={card.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {card.title}
                                    </Typography>
                                    <Typography>{card.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* About Us Section */}
            <Box sx={{ bgcolor: '#fffff', py: 5 }}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" align="center">
                        We are a company dedicated to providing the best services to our customers.
                        Our mission is to deliver excellence in everything we do.
                    </Typography>
                </Container>
            </Box>

            {/* Social Media Icons */}
            <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Follow Us
                </Typography>
                <Box>
                    {socialMediaLinks.map((social, index) => (
                        <Button
                            key={index}
                            href={social.link}
                            target="_blank"
                            sx={{ mx: 1 }}
                            color="primary"
                        >
                            {social.icon}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
}

export default Home;