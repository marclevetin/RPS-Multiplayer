// Initialize Firebase
var config = {
  apiKey: "AIzaSyCd9fS65x4GmbvHTS5qAJ6nQMzN8LYJDKE",
  authDomain: "rock-paper-scissors-multi.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-multi.firebaseio.com",
  projectId: "rock-paper-scissors-multi",
  storageBucket: "",
  messagingSenderId: "1038671516504"
};
firebase.initializeApp(config);

let database = firebase.database();
