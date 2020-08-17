import React from "react";
import styles from "./Review.module.css";
import Rating from '@material-ui/lab/Rating';
import {TextField , Avatar , Collapse , Modal , Backdrop , Fade} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {MultipleSlider} from "../../components";


const RenderReview=({reviews})=>{
  const[btnName, setBtnName] = React.useState("show more"); 
  const[showReviews , setShowReviews]= React.useState(2<reviews.length?(reviews.length)-2:0);
  
  if( reviews && reviews.length )
  { 
    function showHandle(){
      if(btnName==="show more")
      {
        setShowReviews(0);
        setBtnName("show less");
      }
      else if(btnName==="show less")
      {
        setShowReviews(2< reviews.length ? reviews.length-2 : 0);
        setBtnName("show more");
      }
      
        
    }
   
    return(<div>
{
  reviews.slice(showReviews,reviews.length).map(review=>{
        return(
         <div className={styles.card}>
         <li>
           <Avatar  className={styles.avatar}alt={review.author} src="#"/>
           <h5> {review.author}</h5>
          <p> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</p>
           <h6><Rating
           name="read-only"
           value={review.rating}
           size="small"
          readOnly
         /></h6>
           <h6>{review.review}</h6>
         </li>
        </div>
        )
      })
    }
    <button onClick={showHandle}>{btnName}</button>
      
       </div>)
     
       
     
    } 
    
  else{
    return(
      <div className={styles.card}>
      <h6>No Reviews Yet !</h6>
      </div>
    )
  }
}

export const Review = (props) => {
 
  const[Form , setForm]=React.useState({
    name:"",
    rating:2,
    review:"",
    file:null,
    
  })
  const handleChange=(event)=>{
    const {name , value} = event.target;
    
   
      setForm(prev=>({...prev,[name]:value}));
    
     
  }
 
  const handleSubmit=(event)=>{
    
    alert(JSON.stringify(Form));
    setForm({
      name:"",
    rating:2,
    review:"",
    file:null,
    })
     event.preventDefault();};

  const [isTableExpanded, setTableExpanded] = React.useState(false);
  function toggleTable() {
    setTableExpanded(!isTableExpanded);
   
  }
  const [open, setOpen] = React.useState(false);
  function handleOpen() {
    setOpen(true);
   
  }

  function handleClose(){
    setOpen(false)
  }
  
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
          value={props.product.krRating}
          size="small"
         readOnly
        />(KR Rating)</h6>
        <h6><Rating name="half-rating-read" size="small" defaultValue={2.5} precision={0.5} readOnly />(Customers Rating)</h6>
        <h6><strong>Category: </strong>{props.product.category}</h6>
          <h6><strong>Description: </strong>{props.product.description}</h6>
          <h6><strong>Price: </strong>₹{props.product.price}</h6>
          <button onClick={toggleTable}>More about prices</button>

         <Collapse in={isTableExpanded}><table>
            <tr>
              <th>Price</th>
              <th>Size</th>
            </tr>
            {props.product.priceDetails.map(priceDetail=>{
              return(
                <tr>
                <td>₹{priceDetail.price}</td>
                <td>{priceDetail.size}</td>
              </tr>
              );
            })}
            
          </table></Collapse>

          <button onClick={handleOpen}><span className="fa fa-pencil fa-lg"> </span> Write your Review</button>
        
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <Fade in={open} >
          <div className={styles.paper} >
            <h2 id="transition-modal-title">Write <span>Review</span></h2>
            
            <Box component="fieldset" mb={5} borderColor="transparent">
        <form className={styles.form} onSubmit={handleSubmit}  autoComplete="off"> 
     
     <TextField 
     id="name" 
      label="Name"
      name="name"
      margin="normal"
      value={Form.name}
      required
      onChange={handleChange}
    />


  
  <TextField id="standard-multiline-flexible"
   multiline
   name="review"
   label="Review" 
   margin="normal"
   rowsMax={10} 
   value={Form.review} 
   onChange={handleChange}
   required
   />
   
   <div><h6 >RATE THIS</h6>
  <Rating id="rating"
  style={{float:"left" , marginTop:"20px" , marginLeft:"10px"}}
  name="simple-controlled"
  value={Form.rating}
  onChange={(event,newVal)=>setForm(prev=>({...prev , rating:newVal}))}
   /></div>


   <input type="file"
   className={styles.fileInput}
    name="file"
    value={Form.file}
     onChange={handleChange}/>
   
   <button type="submit">upload review</button>
  
</form>
</Box>
     
 </div>
   </Fade>
   </Modal>
        
  </div>
      
   </div>
   <ul className={styles.listUnstyled}>
   <h4>Reviews &amp; Ratings</h4>
    <RenderReview reviews={props.product.reviews}/>
   </ul>
   <div className={styles.multipleSlider}>
   <MultipleSlider images={props.products.filter((prod) => prod.category === props.product.category && prod.id!==props.product.id)}/>
   </div> 
   


         

    </div>
  );
};
export default Review;
