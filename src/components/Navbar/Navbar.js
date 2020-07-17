import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import classNames from "classnames";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link to="/" className={styles.noDecoration}>
          <h3>
            Kirana <span> Review </span>
          </h3>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navLink}>
          <Link
            to="/"
            className={classNames(styles.noDecoration, styles.colorBlack)}
          >
            Home
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link
            to="/about"
            className={classNames(styles.noDecoration, styles.colorBlack)}
          >
            About
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link
            to="/offer"
            className={classNames(styles.noDecoration, styles.colorBlack)}
          >
            Offer
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
