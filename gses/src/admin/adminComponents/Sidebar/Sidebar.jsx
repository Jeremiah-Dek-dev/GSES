import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { adminMenu } from "../../config/adminMenu";

const wine = "#4B0F1C";
const gold = "#D4AF37";

const drawerWidth = 240;
const collapsedWidth = 70;

const NavItem = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {({ isActive }) => (
        <Tooltip title={collapsed ? label : ""} placement="right">
          <ListItemButton
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 1,
              bgcolor: isActive ? gold : "transparent",
              color: isActive ? wine : "white",
              "&:hover": {
                bgcolor: "#6d1a2b",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "#ccc" }}>
              {icon}
            </ListItemIcon>

            {!collapsed && (
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: isActive ? "white" : gold,
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      )}
    </NavLink>
  );
};

const Sidebar = ({ ordersCount = 0, notificationsCount = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        position: {
          xs: collapsed ? "none" : "absolute",
          md: collapsed ? "none" : "relative",
        },
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
          backgroundColor: wine,
          color: "white",
        },
      }}
    >
      {/* Toggle */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <MenuIcon sx={{ color: "#fff" }} />
          ) : (
            <MenuOpenIcon sx={{ color: gold }} />
          )}
        </IconButton>
      </Box>

      {/* Menu */}
      <List>
        {adminMenu.map((item) => {
          let icon = item.icon;

          if (item.badge === "ordersCount") {
            icon = (
              <Badge badgeContent={ordersCount} color="error">
                {item.icon}
              </Badge>
            );
          }

          if (item.badge === "notificationsCount") {
            icon = (
              <Badge badgeContent={notificationsCount} color="error">
                {item.icon}
              </Badge>
            );
          }

          return (
            <NavItem
              key={item.path}
              to={item.path}
              icon={icon}
              label={item.label}
              collapsed={collapsed}
            />
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
