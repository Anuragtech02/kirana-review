import React from "react";
import { Paper, Typography, Button, makeStyles } from "@material-ui/core";
import styles from "./Result_Products.module.css";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  h6: {
    fontWeight: "bold !important",
  },
}));

export default function Result_Product(props) {
  const classes = useStyles();
  // console.log(props.product);
  return (
    <div style={{ paddingBottom: "15px" }}>
      <Paper className={styles.Paper}>
        <Link
          to={`/Review/${props.product.id}`}
          style={{ textDecoration: "none" }}
        >
          <img className={styles.image} src={props.product.imgSrc} />
        </Link>
        <div className={styles.description}>
          <div className={styles.content}>
            <Link
              to={`/Review/${props.product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="h6" className={classes.h6}>
                {props.product.name}
              </Typography>
            </Link>
            <h6>
              KR Rating
              <Rating
                name="read-only"
                value={props.product.krRating}
                size="small"
                readOnly
              />
            </h6>
            <h6>
              Customers Rating
              <Rating
                name="half-rating-read"
                size="small"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </h6>
            <h6>Price : ${props.product.price}</h6>
          </div>
          <div className={styles.button}>
            <Link
              to={`/Review/${props.product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button className={styles.addBtn}>Review</Button>
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
}
