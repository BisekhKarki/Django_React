import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const MainLayouts = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayouts;
