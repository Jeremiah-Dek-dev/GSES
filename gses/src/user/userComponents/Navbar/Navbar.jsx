/* eslint-disable  */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaChevronDown, FaLongArrowAltRight, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import UserDrop from "../UserDrop/UserDrop";

const wine = "#4B0F1C";
const gold = "#D4AF37";
const white = "#fff";

const Navbar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();
  const profileRef = useRef(null);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contacts", path: "/#contactUs" },
    { label: "About", path: "/aboutUs" },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

const toggleProfile = () => {
  setOpen(prev => !prev);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: { xs: 3, md: 10 },
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: wine,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: gold,
            fontWeight: "bold",
            textDecoration: "none",
            letterSpacing: 2,
          }}
        >
          GSES
        </Typography>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {navItems.map((item, i) => (
            <Typography
              key={i}
              component={item.path.startsWith("#") ? "a" : Link}
              to={item.path.startsWith("#") ? undefined : item.path}
              href={item.path.startsWith("#") ? item.path : undefined}
              sx={{
                color: location.pathname === item.path ? gold : white,
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": { color: gold, borderBottom: `2px solid ${gold}` },
                transition: "all 0.3s ease",
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* Desktop CTA */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {user?.name ? (
            <Box position={"relative"} display={"flex"}>
            <Typography
              variant="body3"
              color="#ccc"
              sx={{ display: "grid", alignItems: "center", gap: 1 }}
            >
              <Box
                ref={profileRef}
                sx={{ position: "relative", display: "flex", alignItems: "center" }}
              >
                <IconButton
                  onClick={toggleProfile}
                  sx={{
                    marginLeft: "30px",
                    mb: -1,
                    transition: "background 0.15s ease",
                    bgcolor: open ? "rgba(212, 175, 55, 0.15)" : "transparent",
                    "&:hover": { bgcolor: "rgba(212, 175, 55, 0.15)" },
                  }}
                >
                  <FaUser color={open ? "#D4AF37" : "#fff"} size={20} style={{ cursor: "pointer" }} />
                </IconButton>

                <FaChevronDown
                  size={11}
                  color={open ? "#D4AF37" : "#fff"}
                  style={{
                    cursor: "pointer",
                    marginLeft: "-6px",
                    transition: "transform 0.2s ease, color 0.15s ease",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  onClick={toggleProfile}
                />

                <Typography sx={{ ml: 1, fontSize: 14 }}>{user.name}</Typography>
                {open && <UserDrop />}
              </Box>
            </Typography>
            </Box>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
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

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={toggleDrawer(true)} sx={{ color: white }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: wine,
            height: "100%",
            color: white,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
          role="presentation"
        >
          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item, i) => (
              <ListItem
                button
                key={i}
                component={item.path.startsWith("#") ? "a" : Link}
                to={item.path.startsWith("#") ? undefined : item.path}
                href={item.path.startsWith("#") ? item.path : undefined}
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: location.pathname === item.path ? gold : white,
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: gold, my: 1 }} />
          {user?.name ? (
            <Box sx={{display:"flex", alignItems:"center", columnGap:2, justifyContent:"space-between"}}>
            <Typography
              variant="body3"
              color="#ccc"
              sx={{ display: "grid", alignItems: "center", gap: 1 }}
            >
             <FaUser style={{ marginLeft: "30px", cursor:'pointer' }}/>               
              {user.name}
            </Typography>
            <IconButton size="small" disableRipple sx={{ p: 0 }} onClick={logout}>
              <FaSignOutAlt color="#D4AF37" size={16}/>
              <Typography sx={{ml:1, fontSize: 14, fontWeight: 500, color: "#D4AF37" }}>
                          Logout
                </Typography>
              </IconButton>
              
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{
                background: `linear-gradient(180deg, rgba(102,17,13,0.94), rgba(189,92,48,0.94))`,
                borderRadius: 2,
                px: 3,
                color: white,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { opacity: 0.9 },
                mt: 2,
              }}
              onClick={toggleDrawer(false) && (() => navigate("/auth"))}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
