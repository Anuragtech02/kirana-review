import React from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick"; 
import styles from "./MultipleSlider.module.css"; 
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

export const MultipleSlider = (props)=>{
    const imgSlides = () =>  
    props.images.map(image => (  
      <div className={styles.sliderBase}>  
        <Link to={`/Review/${image.id}`} style={{textDecoration:"none"}}>
         <div className={styles.imgContainer}> <img  src= {image.imgSrc} alt={image.name} /></div> </Link>   
          <h6>{image.name}</h6>
         <div> <Rating
          name="read-only"
          value={image.krRating}
          size="small"
         readOnly
        /><p>(KR Rating)</p></div>
          
      </div>  
    ));  
    return (  
        props.images.length?<div className={styles.slider}>  
              
        <h4>Similar Products</h4>   
                     
        <Slider className={styles.centerSlide} 
        dots={true}  
            slidesToShow={4<=props.images.length ? 4 : props.images.length}  
            slidesToScroll={1}  
            autoplay={true}  
            arrows={true}  
            autoplaySpeed={2000}>{imgSlides()}</Slider>  
        </div>:<div></div>  
      );  
}
export default MultipleSlider;