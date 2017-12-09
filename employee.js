
    var config = {
        piKey: "AIzaSyCDdlSmeXbdy5urtRHkcDcYv5xXHFWLe0s",
        authDomain: "recentuser-aef0a.firebaseapp.com",
        databaseURL: "https://recentuser-aef0a.firebaseio.com",
        projectId: "recentuser-aef0a",
        storageBucket: "recentuser-aef0a.appspot.com",
        messagingSenderId: "196825258593"
      };
  
      firebase.initializeApp(config);
  
      // Create a variable to reference the database
      var database = firebase.database();
  
      // Initial Values
      var name = "";
      var role = "";
      var startDate;
      var rate = "";
  
  
  $(document).on("click", "#addrow", function(snapshot) {

    event.preventDefault();
    
    var name = $("#name").val().trim();
    var role = $("#role").val().trim();
    var startDate = moment($("#start").val().trim(), "DD/MM/YY").format("X");
    var rate = $("#rate").val().trim();

    //to DB
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate
      });
    });

    database.ref().on("child_added", function(childSnapshot) {
      //create html
    var newRow = $("<tr class='item'>");
    var newNm = $("<td class='nm'>");
    newNm.text(childSnapshot.val().name);
    var newRl = $("<td class='rl'>");
    newRl.text(childSnapshot.val().role);
    var newDt = $("<td class='dt'>");

    var empStart = childSnapshot.val().startDate;

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
    newDt.text(empStartPretty);

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var newMn = $("<td class='months'>");
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log('converted diff in months:'+ empMonths);
    newMn.text(empMonths);

    // Calculate the total billed rate
    var empRate =childSnapshot.val().rate;
    var empBilled = empMonths * empRate;
    

    var newRt = $("<td class='rt'>");
    newRt.text(childSnapshot.val().rate)
    var newPd = $("<td class='pd'>");
    newPd.text(empBilled);
    

    newRow.append(newNm);
    newRow.append(newRl);
    newRow.append(newDt);
    newRow.append(newMn);
    newRow.append(newRt);
    newRow.append(newPd);
    $('#addData').append(newRow);

    $("#name").val("");
    $("#role").val("");
    $("#start").val("");
    $("#rate").val("");
     
      // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
 
    });

    


           