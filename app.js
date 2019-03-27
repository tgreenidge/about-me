'use strict';

var startQuiz = function(event){
  event.preventDefault();
  var userName = document.getElementById("username").value;

  if (userName === "") {
    console.log("User entered blank username - try again")
    alert("Please type your name and hit 'Submit' to get started");
  } else {
    console.log("User's name is " + userName);

    document.getElementsByTagName('form')[0].style.display = 'none';
    document.getElementById("questions").style.display = 'block';
    document.getElementById("display-name").innerText = userName;

    //number of correct answers
    var numCorrect = 0;

    //set up questions, answers, and explanations
    var questions = [
      "I started coding in college", 
      "I am bew"
    ];

    var answers = ['no', 'yes', 'no', 'no', 'yes'];

    var explanations = ['I started to code in high school'];

    var correctResponseMessage = "Yes, you are correct!";
    var incorrectResponseMessage = "Sorry, that is not the correct response."

    //Icons to mark questions as correct or incorrect
    var correctResponseIcon = '<i class="far fa-check-circle"></i>';
    var incorrectResponseIcon = '<i class="far fa-times-circle"></i>';

    //Get array of elements for questions
    var questionDivs = document.getElementsByClassName("question");
    
    //test to check for divs for questions
    console.log(questionDivs);

    for (var i = 0; i < questions.length; i++) {
      questionDivs[i].innerHTML = "<p>" + questions[i] +"</p>"; 
       var response = "no";

      if (response === answers[i]) {
        console.log(correctResponseMessage);
      } else {
        console.log(incorrectResponseMessage);
      }

      document.getElementById("num-correct").innerHTML = "<span><strong ></strong></span>" +  numCorrect + " / " + questions.length + " Correct";
    }

  }
  

}


