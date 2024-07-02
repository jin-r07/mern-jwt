import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const HeroContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "90vh",
  backgroundColor: theme.palette.background.default,
  textAlign: "center",
}));

const HeroContent = styled(Box)({
  maxWidth: "600px",
});

const ButtonContainer = styled(Box)({
  marginTop: "20px",
  display: "flex",
  gap: "10px",
});

export default function Home() {
  return (
    <HeroContainer>
      <HeroContent>
        <Typography variant="h2" component="h1" gutterBottom>
          MERN Login & Signup with JWT
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          We are glad to have you here. Explore the features and services.
        </Typography>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
}