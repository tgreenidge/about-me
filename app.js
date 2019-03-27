'use strict';

var startQuiz = function(event){
  event.preventDefault();
  var userName = document.getElementById("username").value;

  if (userName === "") {
    alert("Please type your name and hit 'Submit' to get started");
  } else {
    console.log("User's name is " + userName);
  }
  

}


