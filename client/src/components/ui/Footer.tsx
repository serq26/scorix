import React from "react";
import { Box, Container, Typography, Link, Stack, Divider } from "@mui/material";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        backgroundColor: "#edf3fa",
        marginTop: "100px",
        boxShadow: "2px -8px 16px 7px #ddd"
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="center">
          <Box display={"flex"} alignItems={"center"}>
            <ScoreboardIcon color="action" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#6d6f73",
                textDecoration: "none",
              }}
            >
              ScoriX
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} color={"#6d6f73"}>
            <Link href="/#" color="inherit" underline="hover">
              Gizlilik
            </Link>
            <Link href="/#" color="inherit" underline="hover">
              Şartlar
            </Link>
            <Link href="/#" color="inherit" underline="hover">
              Hakkında
            </Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, background: "#aaa" }} />

        <Typography variant="body2" color="#6d6f73" align="center">
          © {new Date().getFullYear()} Scorix. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
