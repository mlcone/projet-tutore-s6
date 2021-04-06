import React from "react";
import './App.css';
import Nav from './Nav';
import Fiche from './Fiche';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Search from './Search';

function App() {

    //const homeLink = <Link to={Home}/>;
  return (
      <Router>
        <div className="App">
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/fiche" component={Fiche} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
      </Router>
  );
}

const Home = () => (
    <div>
        <h1>Recherche</h1>
        <Search />
    </div>
);

export default App;
