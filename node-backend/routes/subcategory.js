const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const conn = db.conn;

//create subcategory auto ID generation
const createSubcategoryQuery = (subcategoryName,categoryId)=>{
    const data = {
      subcategoryId: uuidv4(),
      subcategoryName,
      categoryId
    };
    return data;
}

// GET SUBCATEGORIES OF A SPECIFIC CATEGORY

router.get("/:categoryId", async(req,res)=>{
    await conn.query("SELECT * FROM subcategories WHERE categoryId=?", req.params.categoryId,
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
       req.body.subcategoryName,
       req.body.categoryId
    ),
    (err,result)=>{

        //console.log(req.body.subcategoryName, req.body.categoryId);
      if(err)
      {
        res.status(400).json({"message": err.message});
      }
      else
      {
          res.status(201).send(`${req.body.subcategoryName} added successfully!`) 
      }
    })
  })

  //delete subcategory
  router.delete("/", async (req, res) => {
    await conn.query(
        "DELETE FROM subcategories WHERE subcategoryId = ?", req.body.subcategoryId,
        (err, result) => {
          if (err) {
            res.status(501).send(err.message);
          }
          res.status(201).json(result);
    });
  });

  // UPDATE SUBCATEGORY
  router.patch("/",async(req,res)=>{
      await conn.query("UPDATE subcategories SET subcategoryName=? , categoryId=? WHERE subcategoryId=?",
      [req.body.subcategoryName, req.body.categoryId, req.body.subcategoryId],
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