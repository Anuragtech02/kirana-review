import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Appbar, Navbar, About, Home } from "./components";
import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.navbar}>
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
