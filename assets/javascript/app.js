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

// chat form (data entry)
$("#chat-submit").on("click", function(event) {
  event.preventDefault();
  // grab chat text
  let chatLine = $("#chat-line").val().trim();

  // send to database
  database.ref().child('chat').push({
    allChat: chatLine,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// chat form (show chat history)
database.ref('chat').on("child_added", function(snapshot, prevChildKey) {
  let newPost = snapshot.val();
  $("#chat-history").append("<div>" + newPost.allChat + "</div>")
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// player name form
$("#name-submit").on("click", function(event) {
  event.preventDefault;

  let playerName = $("#name-entry").val().trim();
  debugger;
  database.ref('players/player1').update({
    name: playerName,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});

// player name (show player name)
database.ref('players/player1').on("value", function(snapshot) {
  let playerName = snapshot.val().name;
  $("#player-one").html(playerName);
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
