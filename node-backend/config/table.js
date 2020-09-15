
const db = require("../config/db");

const conn = db.conn;

// CREATE CATEGORIES TABLE
const createCategoryTable = async()=>{
    await conn.query("SHOW TABLES FROM kiranareview LIKE 'categories'", (err,result)=>{
      if(err)
      {
        throw err;
       // console.log(err);
      }
     if(!result.length)
     {
     conn.query(
       "CREATE TABLE categories (name VARCHAR(100) NOT NULL , image VARCHAR(500) NOT NULL, stock INT NOT NULL , PRIMARY KEY (name))", 
           (err,result)=>{
                  if(err)
                  {
                    throw err;
                  }
                  else
                  {
                    console.log(" categories table created");
                  }
           })
       }
     // console.log(result);
    
      });
  }
  // CREATE SUBCATEGORIES TABLE
  const createSubcategoryTable = async()=>{
    await conn.query("SHOW TABLES FROM kiranareview LIKE 'subcategories'", (err,result)=>{
        if(err)
        {
          throw err;
         // console.log(err);
        }
       if(!result.length)
       {
       conn.query(
         "CREATE TABLE subcategories (name VARCHAR(100) NOT NULL , categoryName VARCHAR(100) NOT NULL , PRIMARY KEY (name) ,  INDEX categoryName_idx (categoryName ASC), CONSTRAINT categoryName FOREIGN KEY (categoryName)  REFERENCES  categories (name) ON DELETE CASCADE ON UPDATE CASCADE)", 
             (err,result)=>{
                    if(err)
                    {
                      throw err;
                    }
                    else
                    {
                      console.log("subcategories table created");
                    }
             })
         }
        });
  }

  // CREATE PRODUCTS TABLE
  const createProductsTable = async()=>{
    await conn.query("SHOW TABLES FROM kiranareview LIKE 'products'", (err,result)=>{
        if(err)
        {
          throw err;
         // console.log(err);
        }
         if(!result.length)
         {
           conn.query(
             "CREATE TABLE products (id VARCHAR(255) NOT NULL , name VARCHAR(100) NOT NULL , price FLOAT NOT NULL , image VARCHAR(500) NOT NULL , description VARCHAR(255) NOT NULL, priceDetails JSON , totalReviews INT , avgRating FLOAT , krRating FLOAT NOT NULL , reviews JSON , cat_name VARCHAR(100) NOT NULL, subcat_name VARCHAR(100) NOT NULL , PRIMARY KEY (id) , INDEX cat_name_idx (cat_name  ASC) , INDEX subcat_name_idx (subcat_name  ASC) , CONSTRAINT cat_name FOREIGN KEY (cat_name) REFERENCES categories (name) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT subcat_name FOREIGN KEY (subcat_name) REFERENCES subcategories (name) ON UPDATE CASCADE ON DELETE CASCADE , FULLTEXT(name, cat_name , subcat_name, description) )", 
             (err,result)=>{
                    if(err)
                    {
                      throw err;
                    }
                    else
                    {
                      console.log(" products table created");
                    }
             })
         }
        });
  }
  // CREATE REVIEW TABLE
  const createReviewTable = async()=>{
    await conn.query("SHOW TABLES FROM kiranareview LIKE 'reviews'", (err,result)=>{
        if(err)
        {
         throw err;
         // console.log(err);
        }
       if(!result.length)
       {
       conn.query(
         "CREATE TABLE reviews (id VARCHAR(255) NOT NULL , productId VARCHAR(255) NOT NULL , userId VARCHAR(255) NOT NULL, rating FLOAT NOT NULL , review VARCHAR(100) NOT NULL , image VARCHAR(255) , PRIMARY KEY (id) ,  INDEX productId_idx (productId ASC), CONSTRAINT productId FOREIGN KEY (productId)  REFERENCES  products (id) ON DELETE CASCADE ON UPDATE CASCADE)", 
             (err,result)=>{
                    if(err)
                    {
                      throw err;
                    }
                    else
                    {
                      console.log(" reviews table created");
                    }
                   
             })
         }
        });
  }
  module.exports.createCategoryTable = createCategoryTable;
  module.exports.createSubcategoryTable = createSubcategoryTable;
  module.exports.createProductsTable = createProductsTable;
  module.exports.createReviewTable = createReviewTable;