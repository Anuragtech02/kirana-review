import React from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick"; 
import styles from "./MultipleSlider.module.css"; 
import {Link} from "react-router-dom";

export const MultipleSlider = (props)=>{
    const imgSlides = () =>  
    props.images.map(image => (  
      <div className={styles.sliderBase}>  
        <Link to={`/Review/${image.id}`} style={{textDecoration:"none"}}>
          <img  src= {image.imgSrc} alt={image.name} /> 
          <h6>{image.name}</h6>
          </Link>   
      </div>  
    ));  
    return (  
        <div className={styles.slider}>  
              
        <h4>Similar Products</h4>   
                     
        <Slider  
        dots={true}  
            slidesToShow={4<=props.images.length ? 4 : props.images.length}  
            slidesToScroll={1}  
            autoplay={true}  
            arrows={true}  
            autoplaySpeed={2000}>{imgSlides()}</Slider>  
        </div>  
      );  
}
export default MultipleSlider;