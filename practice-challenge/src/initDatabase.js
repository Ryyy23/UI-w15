import firebase from './firebase.js';

const playersRef = firebase.database().ref('players');

 // var db = firebase.firestore();
// //  var coursesRef = db.collection("Courses");
 let Playeritem = {};
 Playeritem = {
    name: "Joshua",
    icon: "fa fa-reddit",
    win: 99,
    active: true,
    queue: true
  }
//   playersRef.push(Playeritem);

  Playeritem = {
    name: "Ryordan",
    icon: "fab fa-apple",
    win: 99,
    active: false,
    queue: false
  }

//   playersRef.push(Playeritem);

const boardRef = firebase.database().ref('games');
let board = {};
    board = {
        size: 10,
        status: "finished",
        whosturn: "",
        winner: "-LRtJs4g0_LehCp5OqoY",
        chat:{
            message: "test"
        },
        players: {
            player1: "p1",
            player2: "p2",
        },
        tiles: {
            "0-0": {
                owner: "-LRtJs4g0_LehCp5OqoY",
            },
            "0-1": {
                owner: "-LRtJs4g0_LehCp5OqoY",
            },    
            "1-1": {
                owner: "-LRtJs4lx9LiRJrLgqVj",
            },    
            "2-5": {
                owner: "-LRtJs4lx9LiRJrLgqVj",
            },    
            "9-9": {
                owner: "-LRtJs4g0_LehCp5OqoY",
            },    
        },        
    }
    

//   boardRef.push(board);

