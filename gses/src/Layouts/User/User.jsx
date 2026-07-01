import { useEffect, useState } from "react";
import "./User.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "../../user/userComponents/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../../user/userComponents/LoadingPage/LoadingPage";
import { loadAllImages } from "../../user/utils/loadImages";
import Navbar from "../../user/userComponents/Navbar/Navbar";

const User = () => {
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem("assetsLoaded"),
  );

  useEffect(() => {
    const preloadAssets = async () => {
      if (!localStorage.getItem("assetsLoaded")) {
        await loadAllImages();
        localStorage.setItem("assetsLoaded", "true");
      }
      sessionStorage.setItem("assetsLoaded", "true");
      setIsLoading(false);
    };

    if (isLoading) {
      preloadAssets();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <ToastContainer position="top-left" />
      <div className="app">
        <Navbar />
        {<Outlet />}
        <Footer />
      </div>
    </div>
  );
};

export default User;
