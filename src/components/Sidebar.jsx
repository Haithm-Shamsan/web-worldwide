import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <p className={styles.footer}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise L.L.C
      </p>
    </div>
  );
}

export default Sidebar;
