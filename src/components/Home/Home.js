import React from "react";
import styles from "./Home.module.css";
import { Search } from "@material-ui/icons";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Hey, we review Kirana Products</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className={styles.search}>
        <div className={styles.title}>
          <h4>Grocery</h4>
        </div>
        <div className={styles.input}>
          <input type="text" placeholder="Searh your products from here" />
        </div>
        <div className={styles.btn}>
          <button>
            <Search /> Search
          </button>
        </div>
      </div>
      <div className={styles.scrollIcon}>
        <i class="fas fa-mouse-alt"></i>
      </div>
    </div>
  );
};
export default Home;
