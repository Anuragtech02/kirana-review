import React from "react";
import styles from './CategorizedProduct.module.css';
import {Card, Grid, Button} from '@material-ui/core';
import {Link} from "react-router-dom";
import { products } from "../../Shared/Products";

export const CategorizedProduct = (props)=>{

    if(props.products.length)
   {
    return(
        <div className={styles.container}>
           
          <h1>{props.products[0].category}</h1>
          <div className={styles.subcontainer}>
          <div className={styles.categoryBox}>
         
              <Grid container spacing={3} className={styles.grid}>
              {props.products.map((product)=>{
                  return(
                    <Grid key={product.id} item md={4} lg={3} xs={12} sm={6}>
                   <Card  className={styles.card}>
                   <div className={styles.imageContainer}>
        <Link to={`/Review/${product.id}`} style={{textDecoration:"none"}}> <img src={product.imgSrc} alt={product.name} />
        </Link></div>
        <div className={styles.title}>
        <Link to={`/Review/${product.id}`} style={{textDecoration:"none" , margin:"auto"}}><h5>{product.name}</h5></Link>
          
        </div>
        <div className={styles.price}>
          <h4>₹{product.price}</h4>
          <Button className={styles.addBtn}>Add + </Button>
        </div>
                       

                            
                        
                   </Card>
                   </Grid>
                  )
             })} </Grid>
             </div>
          </div>
        </div>
    )}
    else{
        return <div className={styles.container}>
            <h1>No products to show </h1>
        </div>;
    }
}
export default CategorizedProduct;