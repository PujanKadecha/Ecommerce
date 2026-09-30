import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "80vh", md: "88vh" },
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        color: "#111111",
        mb: { xs: 8, md: 12 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 3, md: 8 }, py: { xs: 8, md: 12 } }}
      >
        <Box sx={{ maxWidth: 660 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5.2rem" },
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              mb: 3,
              color: "#111111",
            }}
          >
            Shop What
            <br />
            You Love.
          </Typography>

          {/* Subtext */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "#666666",
              lineHeight: 1.7,
              mb: 5,
              maxWidth: 500,
              fontWeight: 300,
            }}
          >
            Browse products across fashion, electronics, home, and more — all in
            one place.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                px: 4,
                py: 1.75,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                "&:hover": {
                  backgroundColor: "#222222",
                  color: "#ffffff",
                },
              }}
            >
              Shop Now
            </Button>

            <Button
              component={Link}
              to="/products"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#000000",
                borderWidth: "1.5px",
                color: "#000000",
                px: 4,
                py: 1.75,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                "&:hover": {
                  borderColor: "#000000",
                  borderWidth: "1.5px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
            >
              Browse Categories
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroBanner;
