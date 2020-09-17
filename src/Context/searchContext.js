import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext([]);

export const SearchContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { value: "Category 1", name: "Category 1" },
    { value: "Category 2", name: "Category 2" },
    { value: "Category 3", name: "Category 3" },
    { value: "Category 4", name: "Category 4" },
    { value: "Category 5", name: "Category 5" },
    { value: "Other..", name: "Other.." },
  ]);

  const [subCategories, setSubCategories] = useState([
    { value: "SubCategory 1", name: "SubCategory 1" },
    { value: "SubCategory 2", name: "SubCategory 2" },
    { value: "SubCategory 3", name: "SubCategory 3" },
    { value: "SubCategory 4", name: "SubCategory 4" },
    { value: "SubCategory 5", name: "SubCategory 5" },
    { value: "Other..", name: "Other.." },
  ]);
  const [AddProduct, setAddProduct] = useState([]);

  return (
    <SearchContext.Provider
      value={{ categories, AddProduct, setAddProduct, subCategories }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
