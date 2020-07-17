import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Appbar, Navbar, About, Home } from "./components";
import styles from "./App.module.css";

const App = () => {
  function setBackground() {
    if (
      document.body.scrollTop > 10 ||
      document.documentElement.scrollTop > 10
    ) {
      document.getElementById("navbar").style.background = "white";
      document.getElementById("navbar").style.boxShadow =
        "2px 2px 15px rgba(192,192,192,0.1)";
    } else {
      document.getElementById("navbar").style.background = "transparent";
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

  return (
    <Router>
      <div className={styles.navbar} id="navbar">
        <Navbar />
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
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
