import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, Outlet } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();
  const nolayoutPaths = [
    "/login",
    "/login/signup",
    "/login/email",
    "/login/signupdone",
    "/login/epw",
    "/business",
    "/business/number",
    "/NotFound",
  ];
  const isLayourVisible = !nolayoutPaths.includes(pathname);
  return (
    <div>
      {isLayourVisible && <Header></Header>}
      <main>
        <Outlet />
      </main>
      {isLayourVisible && <Footer></Footer>}
    </div>
  );
}

export default Layout;
