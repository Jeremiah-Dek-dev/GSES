import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { assets } from "../../../user/assets/assets";
import adminApi from "../../../API/adminApi";

const wine = "#4B0F1C";
const gold = "#D4AF37";
const cream = "#FAF7F2";

// --- Reusable stat card ---
const StatCard = ({ icon, label, value, trend, trendUp, color }) => (
  <Card
    sx={{
      p: 3,
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(75,15,28,0.08)",
      border: "1px solid rgba(75,15,28,0.06)",
      height: "100%",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box>
        <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 500, mb: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: wine, lineHeight: 1.2 }}>
          {value}
        </Typography>
      </Box>
      <Avatar sx={{ bgcolor: `${color}18`, color: color, width: 46, height: 46 }}>
        {icon}
      </Avatar>
    </Box>

    {trend && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 2 }}>
        {trendUp ? (
          <TrendingUpIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
        ) : (
          <TrendingDownIcon sx={{ fontSize: 16, color: "#c62828" }} />
        )}
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: trendUp ? "#2e7d32" : "#c62828" }}>
          {trend}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>vs last month</Typography>
      </Box>
    )}
  </Card>
);

const PIE_COLORS = [wine, gold, "#8a2a3d", "#e5c158", "#c9967a"];

const Dashboard = () => {
  const [range, setRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminApi.get(`/api/admin/stats?range=${range}`);
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [range]);

  // Fallback demo data so the layout renders before your endpoint is wired up
  const revenueData = stats?.revenueTrend || [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1900 },
    { day: "Wed", revenue: 1500 },
    { day: "Thu", revenue: 2400 },
    { day: "Fri", revenue: 2100 },
    { day: "Sat", revenue: 2800 },
    { day: "Sun", revenue: 2200 },
  ];

  const categoryData = stats?.categoryBreakdown || [
    { name: "Wedding Lights", value: 42 },
    { name: "Solar Panels", value: 28 },
    { name: "Electrical Gadgets", value: 18 },
    { name: "Other", value: 12 },
  ];

  const topProducts = stats?.topProducts || [
    { name: "Solar Garden Light", sold: 128, stock: 42, image: null },
    { name: "Wedding String Lights", sold: 104, stock: 8, image: null },
    { name: "Portable Inverter", sold: 87, stock: 3, image: null },
    { name: "LED Ceremony Arch", sold: 65, stock: 21, image: null },
  ];

  return (
    <Box sx={{ px: { xs: 0, md: 4 }, py: 4, bgcolor: cream, minHeight: "100vh", width:{xs: 750, md:1200} }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", ml:{xs:2}, mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: wine }}>
            Dashboard
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            Overview of your store's performance
          </Typography>
        </Box>

        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            fontSize: 14,
            fontWeight: 500,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(75,15,28,0.15)" },
          }}
        >
          <MenuItem value="7d">Last 7 days</MenuItem>
          <MenuItem value="30d">Last 30 days</MenuItem>
          <MenuItem value="90d">Last 90 days</MenuItem>
        </Select>
      </Box>

      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 2, "& .MuiLinearProgress-bar": { bgcolor: gold } }} />}

      {/* Stat cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={11} sm={6} md={3} sx={{ml:{xs:2},}}>
          <StatCard
            icon={<AttachMoneyIcon />}
            label="Total Revenue"
            value={`$${(stats?.totalRevenue ?? 14280).toLocaleString()}`}
            trend="+12.4%"
            trendUp
            color={wine}
          />
        </Grid>
        <Grid item xs={11} sm={6} md={3} sx={{ml:{xs:2},}}>
          <StatCard
            icon={<ShoppingCartIcon />}
            label="Orders"
            value={stats?.totalOrders ?? 384}
            trend="+8.1%"
            trendUp
            color={gold}
          />
        </Grid>
        <Grid item xs={11} sm={6} md={3} sx={{ml:{xs:2},}}>
          <StatCard
            icon={<Inventory2Icon />}
            label="Products in Stock"
            value={stats?.totalStock ?? 1204}
            trend="-3.2%"
            trendUp={false}
            color="#8a2a3d"
          />
        </Grid>
        <Grid item xs={11} sm={6} md={3} sx={{ml:{xs:2},}}>
          <StatCard
            icon={<PeopleAltIcon />}
            label="New Customers"
            value={stats?.newCustomers ?? 56}
            trend="+5.6%"
            trendUp
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      {/* Charts row */}
      <Grid container spacing={3} sx={{ mb: 3 }} >
        {/* Revenue trend */}
        <Grid item xs={11} md={8}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(75,15,28,0.08)", height: "100%" }}>
            <Typography sx={{ fontWeight: 700, color: wine, mb: 2 }}>Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={wine} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={wine} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke={wine} strokeWidth={2.5} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Category breakdown */}
        <Grid item xs={11} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(75,15,28,0.08)", height: "100%" }}>
            <Typography sx={{ fontWeight: 700, color: wine, mb: 2 }}>Sales by Category</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>

            <Box sx={{ mt: 1 }}>
              {categoryData.map((c, i) => (
                <Box key={c.name} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <Typography sx={{ fontSize: 13, flex: 1 }}>{c.name}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: wine }}>{c.value}%</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Orders bar chart + top products table */}
      <Grid container spacing={3}>
        <Grid item xs={11} md={5}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(75,15,28,0.08)", height: "100%" }}>
            <Typography sx={{ fontWeight: 700, color: wine, mb: 2 }}>Orders per Day</Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="revenue" fill={gold} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Top products table */}
        <Grid item xs={11} md={7}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(75,15,28,0.08)", height: "100%" }}>
            <Typography sx={{ fontWeight: 700, color: wine, mb: 2 }}>Top Products</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Sold</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Stock</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((p) => (
                    <TableRow key={p.name} sx={{ "&:hover": { bgcolor: "#faf7f2" } }}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar
                            variant="rounded"
                            src={p.image || assets.default_image}
                            sx={{ width: 36, height: 36 }}
                          />
                          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{p.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{p.sold}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{p.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={p.stock < 10 ? "Low Stock" : "In Stock"}
                          size="small"
                          sx={{
                            bgcolor: p.stock < 10 ? "#fdecea" : "#e8f5e9",
                            color: p.stock < 10 ? "#c62828" : "#2e7d32",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;