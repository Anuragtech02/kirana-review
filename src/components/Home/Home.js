import React from "react";
import styles from "./Home.module.css";
import { Search } from "@material-ui/icons";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { HorizontalSlider } from "../../components";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import { createElement } from "react";

export const Home = () => {
  const images = [image1, image2, image3, image4];

  const scrollDown = () => {
    let a = document.createElement("a");
    a.href = "#slider";
    a.click();
  };

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
      <section>
        <div className={styles.slider} id="slider">
          <HorizontalSlider images={images} />
        </div>
      </section>
    </>
  );
};
export default Home;
