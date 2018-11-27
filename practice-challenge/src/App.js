import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './initDatabase.js';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import Registration from './Components/Registration';
import Game from './Components/Game';
import Test from './Components/Test';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <div className="jumbotron" style={{"backgroundColor":"#A93226"}}>
            Challange Three            
              <Navigation />
            </div>
            <Route exact path="/" component={Home} />
            <Route exact path="/Registration" component={Registration} />
            <Route exact path="/Game" component={Game} />
            <Route exact path="/Test" component={Test} />

          </div>       
        </div>
       
      </Router>
    );
  }
}

export default App;