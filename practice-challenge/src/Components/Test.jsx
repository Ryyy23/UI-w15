import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SimpleModal from './SimpleModal';

class Test extends Component {
    render() {
        return (
            <div className="test">            
                <p> This is the TEST Componant</p>
                <SimpleModal />
            </div>
        )
    }
}

export default Test;