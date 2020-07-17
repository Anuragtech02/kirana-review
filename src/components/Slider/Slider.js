import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HorizontalSlider = ({ images }) => {
  useEffect(() => {
    document.querySelectorAll(".slick-arrow").forEach((item) => {
      item.style.background = "white";
      item.style.width = "35px";
      item.style.height = "35px";
      item.style.borderRadius = "100px";
      item.style.zIndex = "1000";
      item.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    });
    document.querySelectorAll(".slick-next").forEach((item) => {
      item.style.right = "20px";
    });
    document.querySelectorAll(".slick-prev").forEach((item) => {
      item.style.left = "20px";
    });
    document.querySelectorAll(".slick-next:before").forEach((item) => {
      item.style.color = "black !important";
    });
    document.styleSheets[0].addRule(
      ".slick-next:before",
      "color: var(--primaryColor) !important;"
    );
    document.styleSheets[0].addRule(
      ".slick-prev:before",
      "color: var(--primaryColor) !important"
    );

    function updateSize() {
      if (window.innerWidth > 1700) setVisibleSlides(3);
      else if (widthBetween(1200, 1700)) setVisibleSlides(3);
      else if (widthBetween(800, 1200)) setVisibleSlides(2);
      else if (window.innerWidth <= 800) setVisibleSlides(1);
    }
    window.addEventListener("resize", updateSize);
  }, []);

  const [visibleSlides, setVisibleSlides] = useState(3);

  //Check if width is between given range
  const widthBetween = (smaller, larger) => {
    if (window.innerWidth <= larger && window.innerWidth > smaller) {
      return true;
    } else {
      return false;
    }
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    accessibility: true,
    lazyload: true,
    slidesToShow: visibleSlides,
    swipeToSlide: true,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {images.map((image, index) => {
          return (
            <div key={index} className={styles.image}>
              <img src={image} alt="slider-offers" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HorizontalSlider;
