import React from "react";
import styles from "./Home.module.css";
import { Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { HorizontalSlider, Product } from "../../components";
import {Link} from "react-router-dom";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import green from "../../assets/images/green.jpg";
import Category from "../Category/Category";

export const Home = () => {
  const images = [image1, image2, image3, image4];

  const scrollDown = () => {
    let a = document.createElement("a");
    a.href = "#slider";
    a.click();
  };

  const products = [
    { 
      id: 1,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description: "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles."
    },
    {
      id: 2,
      name: "Rin",
      price: "485",
      category: "Household",
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/61we91ORBPL._SL1000_.jpg",
        description: "Sparkling bright clothes not only help form great impressions, but also provides confidence to realize ones ambitions. Rin understands this need and strives to deliver best in class whiteness and brightness through continuous innovation and product improvements."
    },
    {
      id: 3,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description: "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles."
    },
    {
      id: 4,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description: "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles."
    },
    {
      id: 5,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description: "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles."
    },
    {
      id: 6,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description: "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
  ];

  return (
    <>
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
          {/* <i className="fas fa-mouse-alt" /> */}
          <ArrowDownwardIcon onClick={scrollDown} />
        </div>
      </div>
      <section className={styles.sliderSection}>
        <div className={styles.slider} id="slider">
          <HorizontalSlider />
        </div>
      </section>
      <section className={styles.products}>
        <div className={styles.productContainer}>
          <Grid container spacing={4}>
          
  {/* Remove <Category /> From Here... */}
          <Category />
  {/* Remove <Category /> From Here... */}
            {products.map((product) => {
              return (
               <Grid key={product.id} item md={4} lg={3} xs={12} sm={6}>
                   <Product product={product} />
                   </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
    </>
  );
};
export default Home;
