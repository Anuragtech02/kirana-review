const express = require("express");
const router = express.Router();
const db = require("../config/db");

const conn = db.conn;

router.get("/:search_keyword", async(req,res)=>{
      
  const searchKeyword =  await conn.query(
      "SELECT * FROM products WHERE MATCH(name, cat_name , subcat_name, description) AGAINST (?)",
      req.params.search_keyword, (err,result)=>{
          if(err)
          {
              res.status(400).json({"message" : err});
          }
           res.status(200).send(result);
      });
});

module.exports = router;