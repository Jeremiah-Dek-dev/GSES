import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../admin/context/AdminAuthContext";
import { Alert, Box, CircularProgress } from "@mui/material";
import { Outlet } from "@mui/icons-material";
import adminApi from "../../API/adminApi";

const AdminProtectedRoute = () => {
  const { roleCheck, setRoleCheck } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const adminRoleCheck = async () => {
    try {
      const res = await adminApi.get("/api/admin/protect");
      if (res.data.success) {
        roleCheck(res.data.success);
        setMessage(res.data.message);
      }
    } catch (error) {
      setRoleCheck(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    adminRoleCheck();
  });

  const awaitMessage = () => {
    setMessage(message);
  };
  setTimeout(() => {
    awaitMessage();
  }, 5000);

  return (
    <Box sx={{ placeSelf: "center", m: 30 }}>
      {loading ? (
        <CircularProgress
          sx={{ width: "400px", height: 10, alignContent: "center" }}
        >
          Please wait ...
        </CircularProgress>
      ) : (
        <>
          {roleCheck === "admin" ? (
            <>
              {awaitMessage && <Alert severity="info">{message}</Alert>}
              <Outlet />
            </>
          ) : (
            <Alert severity="error" sx={{ p: 5 }}>
              {error}
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default AdminProtectedRoute;
