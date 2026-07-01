import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const wine = "#4B0F1C";
const gold = "#D4AF37";
const white = "#fff";

const Navbar = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: 70,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: wine,
        color: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: gold, ml: { xs: 8 } }}
      >
        GSES Admin
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {admin ? (
          <Box sx={{ display: "flex", mx: 2 }}>
            <Avatar sx={{ bgcolor: gold, color: wine }}>
              {admin?.name?.[0]}
            </Avatar>
            <IconButton onClick={logout} sx={{ color: "white" }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            onClick={() => navigate("/admin/auth0")}
            variant="contained"
            sx={{
              background: `linear-gradient(180deg, rgba(102,17,13,0.94), rgba(189,92,48,0.94))`,
              borderRadius: 2,
              px: 3,
              color: white,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { opacity: 0.9 },
            }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
