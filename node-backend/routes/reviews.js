const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const conn = db.conn;

//create review auto ID generation
const createReviewQuery = (productId,userId,rating,review,image)=>{
    const data = {
      id: uuidv4(),
      productId,
      userId,
      rating,
      review,
      image, 
      date:new Date().toDateString(),
    };
    return data;
}

//Get ALL reviews

router.get("/", async (req, res) => {
 await conn.query("SELECT * FROM reviews", (err, result) => {
   if (err) {
     res.status(501).send(err.message);
   }
   res.status(200).json(result);
 });
});

// GET THE REVIEWS OF SPECIFIC PRODUCT
router.get("/:productId", async(req,res)=>{
    await conn.query("SELECT * FROM reviews WHERE productId=?", req.params.productId,
    (err,result)=>{
        if (err) {
            res.status(501).send(err.message);
          }
          res.status(200).json(result);
    })
});

// GET THE REVIEWS OF SPECIFIC USER
router.get("/user/:userId", async(req,res)=>{
    await conn.query("SELECT * FROM reviews WHERE userId=?", req.params.userId,
    (err,result)=>{
        if (err) {
            res.status(501).send(err.message);
          }
          res.status(200).json(result);
    })
});

// CREATE REVIEW 

router.post("/create",async(req,res)=>{
    const newReview = await conn.query("INSERT INTO reviews SET ?",
    createReviewQuery(
        req.body.productId,
        req.body.userId,
        req.body.rating,
        req.body.review,
        req.body.image
    ),
    (err,result)=>{

      if(err)
      {
        res.status(400).json({"message": err.message});
      }
      else
      { // UPDATE AVG RATING IN PRODUCTS

        const averageRating = conn.query("SELECT AVG(DISTINCT(rating)) AS avg, COUNT(*) AS totalReview  FROM reviews WHERE productId = ?",req.body.productId,
        (er,re)=>{
            if(er)
            {
               
              res.status(501).json({"message":er.message}); 
              
            }
           conn.query("UPDATE products SET totalReviews = ? , avgRating = ? WHERE id=?", [re[0].totalReview,re[0].avg,req.body.productId]
           ,(e,r)=>{
            if(e)
            {
              res.status(400).json({"message": e.message});
            }

            // UPDATE REVIEW INSIDE PRODUCTS
            conn.query("SELECT * FROM reviews WHERE productId =? LIMIT 2",req.body.productId,(errorr, results)=>{
              if(errorr){
                res.status(501).json({"message": errorr.message});
              }
              var Array = [];
              for(i=0;i<(re[0].totalReview>2?2:re[0].totalReview); i++)
              {
                var insertReview = {
                  "userId": results[i].userId,
                  "reviewId": results[i].id,
                  "rating": results[i].rating,
                  "review":results[i].review,
                   "image": results[i].image, 
                
                };
             
              Array.push(JSON.stringify(insertReview))
              }
                 conn.query("UPDATE products SET reviews = ? WHERE id = ?", [Array, req.body.productId],
                 (errr , resultt)=>{
                   if(errr)
                   {
                    res.status(501).json({"message": errr.message});
                   }
                   
                 }) 
               
       })
            res.status(201).send("review added successfully!") ;
           })
           //console.log(re[0].avg );
        });
      }
    })
  })
  
 

  //delete REVIEW 
  router.delete("/", async (req, res) => {
    await conn.query(
        "DELETE FROM reviews WHERE id = ?", req.body.id,
        (err, result) => {
          if (err) {
            res.status(501).send(err.message);
          }
          // UPDATE AVG RATING
          const averageRating = conn.query("SELECT AVG(DISTINCT(rating)) AS avg ,COUNT(*) AS totalReview FROM reviews WHERE productId = ?",req.body.productId,
          (er,re)=>{
              if(er)
              {
                res.status(501).send(er.message); 
              }
         
          conn.query("UPDATE products SET totalReviews = ? , avgRating = ?  WHERE id=?", [re[0].totalReview==null?0:re[0].totalReview, re[0].avg==null?0:re[0].avg ,req.body.productId]
          ,(e,r)=>{
           if(e)
           {
             res.status(400).json({"message": e.message});
           }
            // UPDATE REVIEW INSIDE PRODUCTS
            conn.query("SELECT * FROM reviews WHERE productId =? LIMIT 2",req.body.productId,(errorr, results)=>{
              if(errorr){
                res.status(501).json({"message": errorr.message});
              }
             
               var Array = [];
               for(i=0;i<(re[0].totalReview>2?2:re[0].totalReview); i++)
               {
                 var insertReview = {
                   "userId": results[i].userId,
                   "reviewId": results[i].id,
                   "rating": results[i].rating,
                   "review":results[i].review,
                    "image": results[i].image, 
                 
                 };
              
               Array.push(JSON.stringify(insertReview))
               }
                  conn.query("UPDATE products SET reviews = ? WHERE id = ?", [results.length>0?Array:"{}", req.body.productId],
                  (errr , resultt)=>{
                    if(errr)
                    { 
                      console.log(results);
                      res.status(501).json({"message": errr.message});
                    }
                    
                  }) 
                
        })
          res.status(201).json(result);
        });
        //console.log(re);
    }) ;
    });
  });

  // UPDATE REVIEW AND UPDATE AVG RATING
  router.patch("/",async(req,res)=>{

      await conn.query("UPDATE reviews SET review=? , rating=? , productId=?, userId = ?, image = ? , date = ?  WHERE id=?",
      [req.body.review, req.body.rating, req.body.productId, req.body.userId, req.body.image, new Date().toDateString() ,req.body.id],
      (err,result)=>{
          if(err)
          {
              res.status(501).send(err.message);
          }
          else{
            const averageRating = conn.query("SELECT AVG(DISTINCT(rating)) AS avg ,COUNT(*) AS totalReview FROM reviews WHERE productId = ?",req.body.productId,
            (er,re)=>{
                if(er)
                {
                  res.status(501).send(er.message); 
                }
           
            conn.query("UPDATE products SET avgRating = ?  WHERE id=?", [re[0].avg ,req.body.productId]
            ,(e,r)=>{
             if(e)
             {
               res.status(400).json({"message": e.message});
             }
              // UPDATE REVIEW INSIDE PRODUCTS
            conn.query("SELECT * FROM reviews WHERE productId =? LIMIT 2",req.body.productId,(errorr, results)=>{
              if(errorr){
                res.status(501).json({"message": errorr.message});
              }
               var Array = [];
               for(i=0;i<(re[0].totalReview>2?2:re[0].totalReview); i++)
               {
                 var insertReview = {
                   "userId": results[i].userId,
                   "reviewId": results[i].id,
                   "rating": results[i].rating,
                   "review":results[i].review,
                    "image": results[i].image, 
                 
                 };
              
               Array.push(JSON.stringify(insertReview))
               }
                  conn.query("UPDATE products SET reviews = ? WHERE id = ?", [Array, req.body.productId],
                  (errr , resultt)=>{
                    if(errr)
                    {
                      res.status(501).json({"message": errr.message});
                    }
                    
                  }) 
                
        })
            res.status(201).json(result);
          });
      }) ;
             
          }
      })
  })
  module.exports = router;