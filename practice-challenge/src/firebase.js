  // Initialize Firebase
  import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyBDLWF00o4pfnAhY3Jd-MuG3tHNBLT-xcE",
    authDomain: "week15c.firebaseapp.com",
    databaseURL: "https://week15c.firebaseio.com",
    projectId: "week15c",
    storageBucket: "week15c.appspot.com",
    messagingSenderId: "670311570404"
  };
   firebase.initializeApp(config);

  export default firebase;