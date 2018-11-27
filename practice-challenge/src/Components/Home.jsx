import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home">            
                <p> This is the HOME Component</p>
            </div>
        )
    }
}

export default Home;