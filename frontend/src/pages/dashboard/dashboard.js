import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Paper, CircularProgress } from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUser(result);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {user ? (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="body1"><strong>ID:</strong> {user._id}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
          <Button variant="contained" color="primary" onClick={logout} style={{ marginTop: '20px' }}>
            Logout
          </Button>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}