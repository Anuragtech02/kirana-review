import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Appbar,
  Navbar,
  About,
  Home,
  Review,
  Categories,
  CategorizedProduct,
  Search,
  AddProduct,
} from "./components";
import styles from "./App.module.css";
import { products } from "./Shared/Products";
import { useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup, { SignupBase } from "./components/Signup/Signup";
import SearchContext, { SearchContextProvider } from "./Context/searchContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
   
    window.scrollTo(
      {
        top: 0,
        behavior: "instant"
      }
    );

  }, [pathname]);

  return null;
}

const App = () => {
  function setBackground() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("navbar").style.background = "white";
      document.getElementById("navbar").style.boxShadow =
        "2px 2px 15px rgba(192,192,192,0.1)";
    } else {
      document.getElementById("navbar").style.background = "none";
      document.getElementById("navbar").style.boxShadow = "none";
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", setBackground);
    }
    watchScroll();

    return () => {
      window.removeEventListener("scroll", setBackground);
    };
  }, []);

  const ReviewWithId = ({ match }) => {
    return (
      <Review
        product={
          products.filter(
            (product) => product.id === parseInt(match.params.id, 10)
          )[0]
        }
        products={products}
      />
    );
  };
  const ProductWithName = ({ match }) => {
    return (
      <CategorizedProduct
        products={products.filter(
          (product) => product.category === match.params.name
        )}
      />
    );
  };
  return (
    <SearchContextProvider>
      <Router>
     <ScrollToTop/>
        <div className={styles.navbar} id="navbar">
          <Navbar />
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/signupbase" component={SignupBase} />
          <Route path="/Review/:id" exact component={ReviewWithId} />
          <Route path="/categories/:name" exact component={ProductWithName} />
          <Route path="/search/:keyword" exact component={Search} />
          <Route path="/categories" component={Categories} />
          <Route path="/addProduct" component={AddProduct} />
        </Switch>
      </Router>
    </SearchContextProvider>
  );
};

export default App;

// const Home = () => {
//   return (
//     <div>
//       <div>Hello I'm home</div>
//     </div>
//   );
// };
