import React from "react";
import Swiper from "react-id-swiper";
import { Button } from "@material-ui/core";
import styles from "./SwiperSlider.module.css";
import image1 from "../../assets/slider/image1.jpg";
import image2 from "../../assets/slider/image2.jpg";
import image3 from "../../assets/slider/image3.jpg";
import image4 from "../../assets/slider/image4.jpg";

export const SwiperSlider = () => {
  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const slides = [
    {
      image: image1,
      title: "Image 1",
      button: "www.kiranareview.com",
    },
    {
      image: image2,
      title: "Image 2",
      button: "www.kiranareview.com",
    },
    {
      image: image3,
      title: "Image 3",
      button: "www.kiranareview.com",
    },
    {
      image: image4,
      title: "Image 4",
      button: "www.kiranareview.com",
    },
  ];

  return (
    <div className={styles.sliderContainer}>
      <Swiper {...params}>
        {slides.map((slide) => {
          return (
            <div className={styles.slideContainer}>
              <div
                style={{ backgroundImage: `url(${slide.image})` }}
                className={styles.slide}
              >
                <h2>{slide.title}</h2>
                <Button>Show More</Button>
              </div>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
