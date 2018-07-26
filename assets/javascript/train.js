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

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  //Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;

  var firstTrainTimeConverted = moment(firstTrain, "HH:mm").subtract(
    1,
    "years"
  );
  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesAway = trainFrequency - tRemainder;
  var nextArrival = moment()
    .add(tMinutesAway, "minutes")
    .format("HH:mm");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesAway)
  );

  $("#train-table > tbody").append(newRow);
  //Original Idea:
  //get the first train time and then add the frequency(min) to first train time to get next arrival.
  // subtract next arrival time by current time to get minutes away.
  // how do we create a new 'next arrival' once the 'next arrival' time is met the first time.

  //The right way for time/moment:
  //take the users inputted time and subtract a year from it so that our time
  //is always ahead of the users, otherwise we will get negative time.
  //grab the difference in minutes between the user inputted time that was pushed back a year behind and the current time.
  //Modulus the difference in time (total minutes from user inputted time and current time) by the frequency of train time.
  //subtract the time frequency of trains by the modulus remainder of the current time and user
  //time to get the time remaining until the next train
  //next train arrival time is calculated by adding tMinutesAway to the current time.
});
