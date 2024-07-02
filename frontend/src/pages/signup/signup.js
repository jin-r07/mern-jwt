import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "300px",
});

const FormField = styled(TextField)({
  marginBottom: "16px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
});

const StyledLink = styled(Link)({
  marginTop: "20px",
  textAlign: "center",
});

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({ email: "", password: ""});

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    
    if (!isValid) {
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.user._id) {
        navigate("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (e) {
      console.error(e.message);
    }
  };  

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      <Form noValidate>
        <FormField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Signup
        </SubmitButton>
        <StyledLink component={RouterLink} to="/login">
          Already have an account? Login
        </StyledLink>
      </Form>
    </FormContainer>
  );
}