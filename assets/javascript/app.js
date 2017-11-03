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

// chat form
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

database.ref('chat').on("child_added", function(snapshot, prevChildKey) {
  let newPost = snapshot.val();
  $("#chat-history").append("<div>" + newPost.allChat + "</div>")
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
