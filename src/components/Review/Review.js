import React from "react";
import styles from "./Review.module.css";
import Rating from '@material-ui/lab/Rating';
import {MultipleSlider} from "../../components";

export const Review = (props) => {
  return (
<div className={styles.container}>
  <div className={styles.flowLeft}>
      <div className={styles.imgContainer} >
         <img src={props.product.imgSrc}/>
      </div>
      <div className={styles.title}>
        <h5>{props.product.name}</h5>
        <h6><Rating
          name="read-only"
          value="3"
         readOnly
        /></h6>
        <h6><strong>Category: </strong>{props.product.category}</h6>
          <h6><strong>Description: </strong>{props.product.description}</h6>
          <h6><strong>Price: </strong>₹{props.product.price}</h6>
          <button><span className="fa fa-pencil fa-lg"> </span> Write your Review</button>
      </div>
      
   </div>
   <div className={styles.multipleSlider}>
   <MultipleSlider images={props.products.filter((prod) => prod.category === props.product.category)}/>
   </div> 
   <ul className={styles.listUnstyled}>
   <h4>Reviews &amp; Ratings</h4>{
     props.product.reviews.map(review=>{
       return(
        <div className={styles.card}>
        <li>
          <h5>{review.author}</h5>
         <p> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</p>
          <h6><Rating
          name="read-only"
          value={review.rating}
         readOnly
        /></h6>
          <h6>{review.review}</h6>
        </li>
       </div>
       )
     })
   }</ul>
   
        
         
          
        
         <div>
           
        
      </div>

    </div>
  );
};
export default Review;
