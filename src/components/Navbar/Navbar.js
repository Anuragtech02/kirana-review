import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link to="/" className={styles.noDecoration}>
          <h3>Kirana Review</h3>
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <ul className={styles.navLinks}>
          <li className={styles.navLink}>Home</li>
          <li className={styles.navLink}>About</li>
          <li className={styles.navLink}>Offer</li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
