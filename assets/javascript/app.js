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

  let currentPlayerOne = $("#player-one").text();
  let databaseLocation;

  if (currentPlayerOne === "Player 1 goes here") {
    databaseLocation = 'players/player1'
  } else {
    databaseLocation = 'players/player2'
  }

  database.ref(databaseLocation).update({
    name: playerName,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});

// player name (show player names)
database.ref('players').on("value", function(snapshot) {
  let playerData = snapshot.val();
  $("#player-one").html(playerData.player1.name);
  $("#player-two").html(playerData.player2.name);
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// process player selections
$(".rps-selection").on("click", "li", function(){
  let selection = $(this).text().trim();
  let player = $(this).parent().siblings()[0].id;
  let databaseLocation;

  if (player === "player-one") {
    databaseLocation = 'players/player1'
  } else {
    databaseLocation = 'players/player2'
  }

  // save selection to database
  database.ref(databaseLocation).update({
    playerChoice: selection
  })

  // change view so a new selection can't be made
  $(this).parent().remove()

  gameWon()
})
// game engine
function gameWon() {
  database.ref('players').on('value', function(snapshot){
    let playerOneChoice = snapshot.val().player1.playerChoice;
    let playerTwoChoice = snapshot.val().player2.playerChoice;
    let winnerMessage;

    // Rock beats Scissors
    // Scissors beats paper
    // Paper beats Rock

    if (playerOneChoice === "" || playerTwoChoice === "") {
      winnerMessage = "not ready yet"
    } else if (playerOneChoice === playerTwoChoice) {
      winnerMessage = "It's a tie!"
    } else if (playerOneChoice === "Rock" && playerTwoChoice === "Scissors") {
      winnerMessage = "Player 1 wins!"
    } else if (playerOneChoice === "Scissors" && playerTwoChoice === "Paper") {
      winnerMessage = "Player 1 wins!"
    } else if (playerOneChoice === "Paper" && playerTwoChoice === "Rock") {
      winnerMessage = "Player 1 wins!"
    } else {
      winnerMessage = "Player 2 wins!"
    }

    return winnerMessage

  })
}
