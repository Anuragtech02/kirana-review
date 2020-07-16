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
          <Link to="/" className={styles.noDecoration}>
            <li className={styles.navLink}>Home</li>
          </Link>
          <Link to="/about" className={styles.noDecoration}>
            <li className={styles.navLink}>About</li>
          </Link>
          <Link to="/offer" className={styles.noDecoration}>
            <li className={styles.navLink}>Offer</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
