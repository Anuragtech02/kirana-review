const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const conn = db.conn;

//Create product auto ID generation
const createProductQuery = (name, price, image, description, priceDetails,totalReviews,avgRating,krRating,reviews,cat_name,subcat_name) => {
  const data = {
    id: uuidv4(),
    name,
    price: parseFloat(price),
    image,
    description,
    priceDetails,
    totalReviews,
    avgRating,
    krRating,
    reviews,
    cat_name,
    subcat_name,
    
  };
  return data;
};

//GET All Products
router.get("/", async (req, res) => {
  await conn.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.status(501).send(err.message);
    }
    res.status(200).json(result);
  
  });
});

//GET One Product
router.get("/:id", async (req, res) => {
  await conn.query(
    "SELECT * FROM products WHERE id = ?", req.params.id, (err, result) => {
      if (err) {
        res.status(501).send(err.message);
      }
      res.status(200).json(result);
     
  });
  //res.status(200).send(`The requested product is ${req.params.id}`);
});

// GET THE PRODUCTS OF A SPECIFIC CATEGORY
router.get("/category/:cat_name", async (req, res) => {
  await conn.query(
    "SELECT * FROM products WHERE cat_name = ?", req.params.cat_name, (err, result) => {
      if (err) {
        res.status(501).send(err.message);
      }
      res.status(200).json(result);
     
  });
  
});

// GET THE PRODUCTS OF A SPECIFIC SUBCATEGORY
router.get("/subcategory/:subcat_name", async (req, res) => {
  await conn.query(
    "SELECT * FROM products WHERE subcat_name = ?", req.params.subcat_name, (err, result) => {
      if (err) {
        res.status(501).send(err.message);
      }
      res.status(200).json(result);
     
  });
  
});

//Create Product

router.post("/create", async (req, res) => {
 const newProduct = await conn.query(
 "INSERT INTO products SET ?",
    createProductQuery(
      req.body.name,
      req.body.price,
      req.body.image,
      req.body.description,
      req.body.priceDetails,
      req.body.totalReviews,
      req.body.avgRating,
      req.body.krRating,
     req.body.reviews,
      req.body.cat_name,
      req.body.subcat_name,
    ),
    (err, result) => {
     
      if (err) {
        res.status(400).json({ message: err.message });
      }
      
      
        // UPTATE STOCK IN CATEGORIES TABLE
        const stock = conn.query("SELECT COUNT(*) AS stock FROM products WHERE cat_name=?", req.body.cat_name,
        (er,re)=>{
          if(er)
          {
           res.status(501).send(er.message);
          }
        
      conn.query("UPDATE categories SET stock = ? WHERE name=?",
      [re[0].stock==null?0:re[0].stock,req.body.cat_name],(e,r)=>{
        if(e)
        {
         res.status(400).json({ message: e.message });
        }
        res.status(201).json(`${req.body.name} added successfully!`);
       })
      })
         
      
    }
  );
});

//Update Product
router.patch("/", async (req, res) => {

  const prevCatName = await conn.query(
    "SELECT cat_name AS catName FROM products WHERE id = ?",req.body.id,(err,results)=>
    {
      if(err){
        res.status(501).json({"message": err.message})
      }

   const subcatName =  conn.query(
    "SELECT categoryName AS catName FROM subcategories WHERE name = ?",req.body.subcat_name,(err,subcategory)=>
    {
      if(err){
        res.status(501).json({"message": err.message})
      }
      if(subcategory[0].catName != req.body.cat_name)
      {
        res.status(400).json({"message": "invalid subcategory"})
      }
    
     conn.query(
      "UPDATE products SET name = ?, price = ?, image = ?, description = ?, priceDetails = ?, totalReviews = ?, avgRating = ?, krRating = ?, reviews = ? , cat_name = ?, subcat_name = ?   WHERE id = ? ",
      [req.body.name, req.body.price, req.body.image,req.body.description,req.body.priceDetails,req.body.totalReviews,req.body.avgRating,req.body.krRating,req.body.reviews,req.body.cat_name,req.body.subcat_name ,req.body.id],
      (err, result) => {
        if (err) {
          res.status(501).send(err.message);
        }
         // UPTATE TOTAL PRODUCTS IN CATEGORIES TABLE 
        if(results[0].catName != req.body.cat_name)
        {// console.log(results[0].cat_id , req.body.cat_Id)
          const stock1 = conn.query("SELECT COUNT(*) AS stock1 FROM products WHERE cat_name=?", req.body.cat_name,
          (er,re)=>{
            if(er)
            {
             res.status(501).send(er.message);
            }
          
        conn.query("UPDATE categories SET stock = ? WHERE categoryName=?",
        [re[0].stock1==null?0:re[0].stock1,req.body.cat_name],(e,r)=>{
          if(e)
          {
           res.status(400).json({ message: e.message });
          }
          const stock2 = conn.query("SELECT COUNT(*) AS stock2 FROM products WHERE cat_name=?",results[0].catName,
          (er,re)=>{
            if(er)
            {
             res.status(501).send(er.message);
            }
          
        conn.query("UPDATE categories SET stock = ? WHERE categoryName=?",
        [re[0].stock2==null?0:re[0].stock2,results[0].catName],(e,r)=>{
          if(e)
          {
           res.status(400).json({ message: e.message });
          }
           
         })
        })
         })
        })
      }
        res.status(202).json(result);
  });
});
});
});

//Delete Product
router.delete("/", async (req, res) => {
  await conn.query(
      "DELETE FROM products WHERE id = ?", req.body.id,
      (err, result) => {
        if (err) {
          res.status(501).send(err.message);
        }
       
         // UPTATE TOTAL PRODUCTS IN CATEGORIES TABLE
         const stock = conn.query("SELECT COUNT(*) AS stock FROM products WHERE cat_name=?", req.body.cat_name,
         (er,re)=>{
           if(er)
           {
            res.status(501).send(er.message);
           }
         
       conn.query("UPDATE categories SET stock = ? WHERE categoryName=?",
       [re[0].stock==null?0:re[0].stock,req.body.cat_name],(e,r)=>{
         if(e)
         {
          res.status(400).json({ message: e.message });
         }
          res.status(200).json("deleted successfully");
        })
       })
  });
});





module.exports = router;
