import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const adminMenu = [
  {
    label: "Add Items",
    path: "/admin/add",
    icon: <AddBoxIcon />,
  },
  {
    label: "List Items",
    path: "/admin/list",
    icon: <ListAltIcon />,
  },
  {
    label: "Orders",
    path: "/admin/order",
    icon: <LocalShippingIcon />,
    badge: "ordersCount",
  },
  {
    label: "Notifications",
    path: "/admin/notification",
    icon: <NotificationsIcon />,
    badge: "notificationsCount",
  },
];
