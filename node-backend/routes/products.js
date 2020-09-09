const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const conn = db.conn;

//Create product auto ID generation
const createProductQuery = (name, price, image, description, priceDetails,totalReviews,avgRating,krRating,reviews,cat_Id,subcat_Id) => {
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
    cat_Id,
    subcat_Id,
    
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
router.get("/category/:categoryId", async (req, res) => {
  await conn.query(
    "SELECT * FROM products WHERE cat_Id = ?", req.params.categoryId, (err, result) => {
      if (err) {
        res.status(501).send(err.message);
      }
      res.status(200).json(result);
     
  });
  
});

// GET THE PRODUCTS OF A SPECIFIC SUBCATEGORY
router.get("/subcategory/:subcategoryId", async (req, res) => {
  await conn.query(
    "SELECT * FROM products WHERE subcat_Id = ?", req.params.subcategoryId, (err, result) => {
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
      req.body.cat_Id,
      req.body.subcat_Id,
    ),
    (err, result) => {
     
      if (err) {
        res.status(400).json({ message: err.message });
      }
      
      
        // UPTATE TOTAL PRODUCTS IN CATEGORIES TABLE
        const totalProducts = conn.query("SELECT COUNT(*) AS totalProduct FROM products WHERE cat_Id=?", req.body.cat_Id,
        (er,re)=>{
          if(er)
          {
           res.status(501).send(er.message);
          }
        
      conn.query("UPDATE categories SET totalProducts = ? WHERE categoryId=?",
      [re[0].totalProduct==null?0:re[0].totalProduct,req.body.cat_Id],(e,r)=>{
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

  const cat_id = await conn.query(
    "SELECT cat_Id AS cat_id FROM products WHERE id = ?",req.body.id,(err,results)=>
    {
      if(err){
        res.status(501).json({"message": err.message})
      }

   const subcat_id =  conn.query(
    "SELECT categoryId AS catId FROM subcategories WHERE subcategoryId = ?",req.body.subcat_Id,(err,subcategory)=>
    {
      if(err){
        res.status(501).json({"message": err.message})
      }
      if(subcategory[0].catId != req.body.cat_Id)
      {
        res.status(400).json({"message": "invalid subcategory"})
      }
    
     conn.query(
      "UPDATE products SET name = ?, price = ?, image = ?, description = ?, priceDetails = ?, totalReviews = ?, avgRating = ?, krRating = ?, reviews = ? , cat_Id = ?, subcat_Id = ?   WHERE id = ? ",
      [req.body.name, req.body.price, req.body.image,req.body.description,req.body.priceDetails,req.body.totalReviews,req.body.avgRating,req.body.krRating,req.body.reviews,req.body.cat_Id,req.body.subcat_Id ,req.body.id],
      (err, result) => {
        if (err) {
          res.status(501).send(err.message);
        }
         // UPTATE TOTAL PRODUCTS IN CATEGORIES TABLE 
        if(results[0].cat_id != req.body.cat_Id)
        {// console.log(results[0].cat_id , req.body.cat_Id)
          const totalProducts1 = conn.query("SELECT COUNT(*) AS totalProduct1 FROM products WHERE cat_Id=?", req.body.cat_Id,
          (er,re)=>{
            if(er)
            {
             res.status(501).send(er.message);
            }
          
        conn.query("UPDATE categories SET totalProducts = ? WHERE categoryId=?",
        [re[0].totalProduct1==null?0:re[0].totalProduct1,req.body.cat_Id],(e,r)=>{
          if(e)
          {
           res.status(400).json({ message: e.message });
          }
          const totalProducts2 = conn.query("SELECT COUNT(*) AS totalProduct2 FROM products WHERE cat_Id=?",results[0].cat_id,
          (er,re)=>{
            if(er)
            {
             res.status(501).send(er.message);
            }
          
        conn.query("UPDATE categories SET totalProducts = ? WHERE categoryId=?",
        [re[0].totalProduct2==null?0:re[0].totalProduct2,results[0].cat_id],(e,r)=>{
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
         const totalProducts = conn.query("SELECT COUNT(*) AS totalProduct FROM products WHERE cat_Id=?", req.body.cat_Id,
         (er,re)=>{
           if(er)
           {
            res.status(501).send(er.message);
           }
         
       conn.query("UPDATE categories SET totalProducts = ? WHERE categoryId=?",
       [re[0].totalProduct==null?0:re[0].totalProduct,req.body.cat_Id],(e,r)=>{
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
