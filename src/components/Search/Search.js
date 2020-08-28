import React from "react";
import styles from "./Search.module.css";
import Paper from "@material-ui/core/Paper";
import FilterList from "../FiltersList/Filter";
import ChipsArray from "./Filter Tags/Tags";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";
import green from "../../assets/images/green.jpg";
import Result_Product from "./ResultProduct/Result_Product";
import { Search as SearchIcon } from "@material-ui/icons";
import SearchContext from "../../Context/searchContext";

const Search = () => {
  // const { categories, setCategories } = React.useContext(SearchContext);
  // React.useEffect(() => {
  //   setCategories(["Category1"]);
    
  // }, []);
  // console.log(categories);
  const products = [
    {
      id: 1,
      krRating: 3,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description:
        "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
    {
      id: 2,
      krRating: 5,
      name: "Rin",
      price: "485",
      category: "Household",
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/61we91ORBPL._SL1000_.jpg",
      description:
        "Sparkling bright clothes not only help form great impressions, but also provides confidence to realize ones ambitions. Rin understands this need and strives to deliver best in class whiteness and brightness through continuous innovation and product improvements.",
    },
    {
      id: 3,
      krRating: 1,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description:
        "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
    {
      id: 4,
      krRating: 3,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description:
        "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
    {
      id: 5,
      krRating: 2,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description:
        "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
    {
      id: 6,
      krRating: 4,
      name: "Lime",
      price: "10",
      category: "Food",
      imgSrc: green,
      description:
        "A lime is a citrus fruit, which is typically round, green in color, 3–6 centimetres in diameter, and contains acidic juice vesicles.",
    },
  ];

  const [ChipsState, setState] = React.useState([]);
  const getState = (state) => {
    setState(state);
  };

  return (
    <div className={styles.OuterContainer}>
      <div>
        {/* Search Bar */}
        <div className={styles.search}>
          <div className={styles.title}>
            <h4>Grocery</h4>
          </div>
          <div className={styles.input}>
            <input type="text" placeholder="Searh your products from here" />
          </div>
          <div className={styles.btn}>
            <button>
              <SearchIcon /> Search
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.filters}>
          <Paper elevation={0}>
            <FilterList getState={getState} />
          </Paper>
        </div>
        <div className={styles.main}>
          <div className={styles.tags}>
            <ChipsArray setValue={ChipsState} />
          </div>
          <div className={styles.products}>
            {products.map((product) => {
              return <Result_Product product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
