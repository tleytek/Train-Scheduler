// Initialize Firebase
var config = {
  apiKey: "AIzaSyAn3nWuJPXVMNru6x0dcuk37vFhzIG6O9A",
  authDomain: "mint-5e4fb.firebaseapp.com",
  databaseURL: "https://mint-5e4fb.firebaseio.com",
  projectId: "mint-5e4fb",
  storageBucket: "mint-5e4fb.appspot.com",
  messagingSenderId: "74196214025"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = $("#first-train-time-input")
    .val()
    .trim();
  var trainFrequency = $("#frequency-input")
    .val()
    .trim();

  //creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrain: firstTrain,
    frequency: trainFrequency
  };

  //Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
  console.log(trainFrequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().trainFrequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(firstTrain),
    $("<td>").text(trainFrequency)
  );

  $("#train-table > tbody").append(newRow);
});
