import React from "react";
import styles from './Categories.module.css';
import {Card, Grid, Collapse} from '@material-ui/core';
import {categories} from "../../Shared/Products";
import {ExpandMore , ExpandLess} from '@material-ui/icons';
import {Link} from "react-router-dom";

export const Categories = ()=>{

    const [click, setClick]=React.useState({});

   function handleClick( id)
   {
       setClick(prev=>({...prev , [id]:!prev[id]}));
       console.log(click[id]);
       
   }

    return(
        <div className={styles.container}>
          <h1>Categories</h1>
          <div className={styles.categoryBox}>
              <Grid container spacing={3} className={styles.grid}>
              {categories.map((category)=>{
                  return(
                    <Grid key={category.id} item md={4} lg={3} xs={12} sm={6}>
                   <Card  className={styles.card}>
                       <div className={styles.imgContainer}>
                      <Link to={`/categories/${category.name}`} style={{textDecoration:"none"}}> <img src={category.img} alt={category.name}/></Link>
                       </div>
                       <div className={styles.title}>
                  <Link to={`/categories/${category.name}`} style={{textDecoration:"none"}}>  <h5>{category.name}</h5></Link> <button onClick={()=>handleClick(category.id)} >{category.subcategory.length &&(click[category.id]?<ExpandLess/>:<ExpandMore/>)}</button>
                       </div>
                        
                        <Collapse in={click[category.id]} className={styles.list}>
                            <ul >
                                <h4>Sub Categories</h4>
                                {
                                    category.subcategory.map(sub=>{
                                        return(
                                            <li>{sub}</li>
                                        )
                                        })
                                }
                            </ul>
                        </Collapse>

                            
                        
                   </Card>
                   </Grid>
                  )
             })} </Grid>
          </div>
        </div>
    )
}
export default Categories;