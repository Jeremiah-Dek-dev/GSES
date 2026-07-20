import { Box, IconButton, Typography, Avatar, Fade, Divider } from "@mui/material";
import React from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const AdminDrop = () => {
  const { user, logout } = useUserAuth();

  return (
    <Fade in timeout={200}>
      <Box
        className="user-drop-down"
        sx={{
          position: "absolute",
          top: "calc(100% + 18px)",
          right: 0,
          width: 280,
          bgcolor: "#5c1616",
          background: "linear-gradient(160deg, #6e1c1c 0%, #4a1212 100%)",
          color: "#fff",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "14px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,175,55,0.08)",
          zIndex: 5,
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -9,
            right: 22,
            width: 16,
            height: 16,
            bgcolor: "#6e1c1c",
            borderTop: "1px solid rgba(212, 175, 55, 0.4)",
            borderLeft: "1px solid rgba(212, 175, 55, 0.4)",
            transform: "rotate(45deg)",
            borderRadius: "3px 0 0 0",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, pt: 3, pb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#D4AF37",
              color: "#4a1212",
              fontWeight: 700,
              width: 44,
              height: 44,
            }}
          >
            {user.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.2 }} noWrap>
              {user.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: "#D4AF37",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {user.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(212, 175, 55, 0.25)", mx: 3 }} />

        {/* Details */}
        <Box sx={{ px: 3, py: 2 }}>
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.65)", mb: 0.3 }}>
            Email
          </Typography>
          <Typography sx={{ fontSize: 14 }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(212, 175, 55, 0.25)", mx: 3 }} />

        {/* Logout */}
        <Box
          onClick={logout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 2,
            cursor: "pointer",
            transition: "background 0.15s ease",
            borderRadius: "0 0 14px 14px",
            "&:hover": { bgcolor: "rgba(212, 175, 55, 0.1)" },
          }}
        >
          <IconButton size="small" disableRipple sx={{ p: 0 }}>
            <FaSignOutAlt color="#D4AF37" size={16} />
          </IconButton>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#D4AF37" }}>
            Logout
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default AdminDrop;