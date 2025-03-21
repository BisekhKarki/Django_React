import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayouts = () => {
  return (
    <>
      <NavBar />
      <ToastContainer limit={1} />
      <Outlet />
    </>
  );
};

export default MainLayouts;
