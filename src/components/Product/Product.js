import React from "react";
import styles from "./Product.module.css";
import { Card, Button } from "@material-ui/core";
import green from "../../assets/images/green.jpg";
import {Link} from "react-router-dom";

export const Product = ({ product }) => {
  const {id, name, category, price, imgSrc } = product;

  return (
    <div clasName={styles.container}>
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
        <Link to={`/Review/${id}`} style={{textDecoration:"none"}}> <img src={imgSrc} alt={name} />
        </Link></div>
        <div className={styles.title}>
        <Link to={`/Review/${id}`} style={{textDecoration:"none" , margin:"auto"}}><h5>{name}</h5></Link>
          <h6>{category}</h6>
        </div>
        <div className={styles.price}>
          <h4>₹{price}</h4>
          <Button className={styles.addBtn}>Add + </Button>
        </div>
      </Card>
    </div>
  );
};
export default Product;
