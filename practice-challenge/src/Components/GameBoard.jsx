import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Tile extends Component {
    constructor() {
        super();
        this.state = {
            owner: "New",            
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        
        let rows = this.props.size;
        let cells = this.props.size;

    //     for (xAxis = 0; xAxis < rows; xAxis++) {
    //         html += "<tr>";
    //         for (yAxis = 0; yAxis < cells; yAxis++) {
    //             html += "<td>";
    //             html += "<i class='fa fa-bullseye board' id='" + xAxis + "-" + yAxis + "' data-player='-1'></i>";
    //             html += "</td>";
    //         }
    //         html += "</tr>;"
    //     }
    }
    
    render() {
        return (
            <div></div>
        )
    }
}
class GameBoard extends Component {
    //Size       = rows & columns
    //Status    = new, playing, end
    //Winner    = Firebase ID from player
    //Player    = Players in the game
    //Icon      = The Icon attached to the current player
    constructor() {
        super();
        this.state = {
            size: 10,
            status: "new",
            winner: "",
            currentplayer: "",
            players: {
                playerid: "",
                currentplayer: true, 
            },
            icon: "fa fa-reddit",
            
        };
        this.handleClick = this.handleClick.bind(this);
        this.checkStateForTrueCurrentPlayer = this.checkStateForTrueCurrentPlayer.bind(this);
    }
    componentWillMount() {
        
        let rows = this.props.size;
        let cells = this.props.size;

        // for (xAxis = 0; xAxis < rows; xAxis++) {
        //     html += "<tr>";
        //     for (yAxis = 0; yAxis < cells; yAxis++) {
        //         html += "<td>";
        //         html += "<i class='fa fa-bullseye board' id='" + xAxis + "-" + yAxis + "' data-player='-1'></i>";
        //         html += "</td>";
        //     }
        //     html += "</tr>;"
        // }
    }

    checkStateForTrueCurrentPlayer(){
        let foundCurrentPlayer = null;
        let myObject = this.state.players;
        var newObject = Object.keys(myObject).map(function(key) {
            console.log(myObject)
            // return myObject[key];
         });
        
        return newObject;
    }

    handleClick() {
        //Check whos turn
        this.checkStateForTrueCurrentPlayer();
        //Check if player clicked on their own tile
        //Update tile
        //Change current player to next player
        // this.setState(
        // this.state.icon = this.state.currentplayer
            
        //     )
    }

    InitialiseTable() {
        return(<div>ba</div>);
    }
    render() {
        const rows = this.state.size;
        const cells = this.state.size;
        const icon = this.state.icon;

        let myTable = '';
        for(let xAxis = 0;xAxis < rows;xAxis++){
            myTable += '<tr>';
            for(let yAxis = 0;yAxis < cells;yAxis++){
                myTable += `<td><i class="${icon}"></i></td>`               
            }
            myTable += '</tr>';
        }
        const props = {
            dangerouslySetInnerHTML: {__html: `${myTable}`}
        }
        return (
            <div className="home">
                <table {...props} onClick={this.handleClick()} >
                </table>                
            </div>
        )
    }
}

export default GameBoard;