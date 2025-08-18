import { Container, Typography, Box, Button } from "@mui/material";
import { RestaurantMenu } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "./supabaseClient";

export default function Hello() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert("Błąd podczas logowania: " + error.message);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <Box display="flex" alignItems="center" mb={2}>
          <RestaurantMenu sx={{ fontSize: 40, mr: 1, color: "primary.main" }} />
          <Typography
            variant="h4"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            FOODTIME
          </Typography>
        </Box>
        <Typography variant="h3" gutterBottom align="center">
          Witaj w FoodTime!
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" mb={4}>
          Zaloguj się, aby korzystać z kalkulatora kalorii, przepisów i listy
          zakupów.
        </Typography>
        <Button
          onClick={handleLogin}
          variant="contained"
          color="inherit"
          sx={{
            borderRadius: "20px",
            minWidth: "0px",
            p: "6px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FcGoogle size={25} />
          <span>Zaloguj przez Google</span>
        </Button>
      </Box>
    </Container>
  );
}
