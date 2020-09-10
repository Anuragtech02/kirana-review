import React from "react";
import styles from "./AddProduct.module.css";
import { TextField, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchContext from "../../Context/searchContext";
import debounce from 'lodash.debounce'

const AddProduct = () => {
  const { AddProduct, setAddProduct } = React.useContext(SearchContext);
  const [price,setPrice] = React.useState(0);
  const [category,setCategory] = React.useState("");
  const [description,setDescription] = React.useState("");
  const [product,setproduct] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [State, setState] = React.useState("");
  const [image, setImage] = React.useState(false);

  let Timeout;

  const ImageURL = (event) => {
    // clearTimeout(Timeout)
    setImageURL(event.target.value)
    // Timeout = setTimeout(()=>{
    //   setImage(true)
    //   console.log("Timer...")
    // },1000);
    const debounceValue = debounce( () =>{
      setImage(true);
      console.log("Timer...")
    },1000)
    debounceValue();
  };

  const debounceValue = debounce( () =>{
    setImage(true);
    console.log("Timer...")
  },1000)

    

  const handleAdd = (event) => {
    event.preventDefault();
    var Arr =
      { Product_Name: product ,
       Image_URL: imageURL ,
       price ,
       category ,
       description };
    setAddProduct([...AddProduct, Arr]);
    console.log("Add Product",AddProduct);
    setState(Arr);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.addProduct}>Add a New Product</h2>
      <div className={styles.innerContainer}>
        <div className={styles.image}>
          {!image ? (
            <Skeleton variant="rect" height="100%" width="100%" />
          ) : (
            <img src={imageURL} className={styles.img} />
          )}
        </div>
        <form onSubmit={handleAdd}>
          <div className={styles.details}>
            <TextField
              variant="outlined"
              label="Product Name"
              size="small"
              className={styles.ProductName}
              required
              onChange={ (event) =>{ setproduct(event.target.value)}}
              id="ProductName"
              value={product}
            />
            <TextField
              variant="outlined"
              label="Image URL"
              size="small"
              className={styles.ProductName}
              required
              onChange={ImageURL}
              id="ImageURL"
              value={imageURL}
            />
            <div className={styles.PriceandCategory}>
              <TextField
                variant="outlined"
                label="Price"
                size="small"
                className={styles.Price}
                onChange={ (event) =>{ setPrice(event.target.value)}}
                required
                id="Price"
                value={price}
                type='number'
              />
              <TextField
                variant="outlined"
                label="Category"
                size="small"
                className={styles.Category}
                required
                id="Category"
                onChange={ (event) =>{ setCategory(event.target.value)}}
                value={category}
              />
            </div>
            <TextField
              variant="outlined"
              label="Description"
              size="small"
              className={styles.Description}
              rowsMax={2}
              multiline
              id="Description"
              onChange={ (event) =>{ setDescription(event.target.value)}}
              value={description}
            />
            <Button
              className={styles.addBtn}
              fullWidth
              type="submit"
            >
              ADD
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
