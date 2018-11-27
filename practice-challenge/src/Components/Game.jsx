import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SimpleModal from './SimpleModal';
import GameBoard from './GameBoard';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            size: 10,            
        };        
    }
    render() {
        return (
            <div className="game">            
                <p> This is the GAME Component</p>
                <SimpleModal />
                <GameBoard size={this.state.size}/>
            </div>
        )
    }
}

export default Game;