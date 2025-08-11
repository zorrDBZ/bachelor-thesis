import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { login } from "api";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { palette } = useTheme();
  const { mode } = useSelector((state) => state);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    try {
      const response = await login({ email, password });
      dispatch(setLogin(response));
      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Box
      width="100%"
      p="2rem"
      mt="2rem"
      borderRadius="0.25rem"
      backgroundColor={palette.background.alt}
    >
      <form onSubmit={handleFormSubmit}>
        <Box mb="1.5rem">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ mb: "0.5rem" }}
            color={palette.neutral.dark}
          >
            Email
          </Typography>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{
              width: "100%",
              backgroundColor: palette.background.alt,
              padding: "0.5rem 1rem",
              "&:focus": {
                backgroundColor: palette.background.default,
              },
            }}
          />
        </Box>
        <Box mb="1.5rem">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ mb: "0.5rem" }}
            color={palette.neutral.dark}
          >
            Password
          </Typography>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{
              width: "100%",
              backgroundColor: palette.background.alt,
              padding: "0.5rem 1rem",
              "&:focus": {
                backgroundColor: palette.background.default,
              },
            }}
          />
        </Box>
        <Box>
          <button
            type="submit"
            disabled={isSigningIn}
            sx={{
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              padding: "0.5rem 2rem",
              "&:hover": {
                backgroundColor: palette.primary.dark,
              },
            }}
          >
            {isSigningIn? "Signing in..." : "Sign in"}
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
