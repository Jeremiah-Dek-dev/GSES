import react, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../API/api";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await api.post("/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myOrders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  });
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
