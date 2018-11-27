
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
            <Link to="/">             
                    <Button variant="contained" color="primary">Home</Button>
                </Link>                
                <Link to="/Game">             
                    <Button variant="contained" color="primary">Game</Button>
                </Link>
                <Link to="/Test">             
                    <Button variant="contained" color="primary">Test</Button>
                </Link>
            </div>
        )
    }
}

export default Navigation;