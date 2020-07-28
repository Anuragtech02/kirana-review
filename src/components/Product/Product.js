import React from "react";
import styles from "./Product.module.css";
import { Card, Button } from "@material-ui/core";
import green from "../../assets/images/green.jpg";

export const Product = ({ product }) => {
  const { name, category, price, imgSrc } = product;

  return (
    <div clasName={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={imgSrc} alt={name} />
        </div>
        <div className={styles.title}>
          <h5>{name}</h5>
          <h6>{category}</h6>
        </div>
        <div className={styles.price}>
          <h4>₹{price}</h4>
          <Button className={styles.addBtn}>Add + </Button>
        </div>
      </div>
    </div>
  );
};
export default Product;
