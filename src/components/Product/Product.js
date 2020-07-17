import React from "react";
import styles from "./Product.module.css";
import green from "../../assets/images/green.jpg";

export const Product = () => {
  return (
    <div clasName={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={green} alt="lime" />
        </div>
        <div className={styles.title}>
          <h5>Lime</h5>
          <h6>Food</h6>
        </div>
        <div className={styles.price}>
          <h4>₹10</h4>
          <h5>Add + </h5>
        </div>
      </div>
    </div>
  );
};
export default Product;
