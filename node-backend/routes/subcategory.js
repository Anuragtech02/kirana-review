const express = require("express");
const router = express.Router();
const db = require("../config/db");

const conn = db.conn;

//create subcategory auto ID generation
const createSubcategoryQuery = (name,categoryName)=>{
    const data = {
      name,
      categoryName
    };
    return data;
}

// GET SUBCATEGORIES OF A SPECIFIC CATEGORY

router.get("/:categoryName", async(req,res)=>{
    await conn.query("SELECT * FROM subcategories WHERE categoryName=?", req.params.categoryName,
    (err,result)=>{
        if(err)
        {
            res.status(501).send(err.message);
        }
        else
        {
            res.status(200).json(result);
        }
    })
})



// CREATE SUBCATEGORY

router.post("/create",async(req,res)=>{
    const newCategory = await conn.query("INSERT INTO subcategories SET ?",
    createSubcategoryQuery(
       req.body.name,
       req.body.categoryName,
    ),
    (err,result)=>{

        //console.log(req.body.subcategoryName, req.body.categoryId);
      if(err)
      {
        res.status(400).json({"message": err.message});
      }
      else
      {
          res.status(201).send(`${req.body.name} added successfully!`) 
      }
    })
  })

  //delete subcategory
  router.delete("/", async (req, res) => {
    await conn.query(
        "DELETE FROM subcategories WHERE name = ?", req.body.name,
        (err, result) => {
          if (err) {
            res.status(501).send(err.message);
          }
          res.status(201).json(result);
    });
  });

  // UPDATE SUBCATEGORY
  router.patch("/",async(req,res)=>{
      await conn.query("UPDATE subcategories SET name=? , categoryName=? WHERE name=?",
      [req.body.updatedName, req.body.categoryName, req.body.name],
      (err,result)=>{
          if(err)
          {
              res.status(501).send(err.message);
          }
          else{
              res.status(202).json(result);
          }
      })
  })
  module.exports = router;