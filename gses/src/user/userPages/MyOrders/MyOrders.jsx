import React, { useState } from "react";
import "./MyOrders.css";
import { assets } from "../../assets/assets";
import api from "../../../API/api";
const MyOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await api.post(
      "/api/order/userOrders",
      {},
      {
        withCredentials: true,
      },
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          const items = order.items || [];
          return (
            <div key={order._id || index} className="my-orders-order">
              <img src={assets.Parcel} alt="" />
              <p>
                {items.map((item, index) => {
                  return (
                    <React.Fragment key={item._id || index}>
                      {item.name} x {item.quantity}
                      {index < items.length - 1 ? ", " : ""}
                    </React.Fragment>
                  );
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
