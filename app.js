'use strict';

//displays updated score to screen
var updateScore = function(numCorrect, numQuestions){
  document.getElementById('num-correct').innerHTML = '<span><strong ></strong></span>' + numCorrect + ' / ' + numQuestions + ' Correct';
};

//returns  randon number between 0 and value, num, entered
var getARandomNumber = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

//startQuiz is called in the HTML doc
var startQuiz = function(event){
  event.preventDefault();
  var userName = document.getElementById('username').value;

  if (userName === '') {
    console.log('User entered blank username - try again');
    alert('Please type your name and hit "Submit" to get started');
  } else {
    console.log('User\'s name is ' + userName);

    document.getElementsByTagName('form')[0].style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    document.getElementById('display-name').innerText = userName;

    //number of correct answers
    var numCorrect = 0;

    //set up questions, answers, and explanations for yes/no section of quiz
    var yesAndNoQuestions = [
      'I started coding in college.', 
      'I served as an Electrician in the Navy.',
      'I recently learned the php programming language.',
      'My favorite color is blue',
      'I previously worked as a statistician'
    ];

    var yesAndNoAnswers = ['no', 'yes', 'no', 'no', 'yes'];

    var yesAndNoExplanations = ['I started to code in high school.', 
      'I served as an Electrician in the Navy in a group called the Seabees.',
      'php is actually the laguage that I am least interested in learning, but if I have to, I will.',
      'Once upon a time, my favorite color was blue, but it is now orange',
      'I worked as a Statistican for a year in Trinidad and Tobago, before moving to Grenada.'
    ];

    //set up questions, answers, and explanations for Guess a number section of quiz
    var guessANumberQuestions = ['I am thinking of a number between 1 and 10, can you guess what it is?'];
    var guessANumberAnswers = [getARandomNumber(10)];
    var guessANumberExplanations = ['The number that I was thinking about was '];
  
    //Generic responses for correct/incorrect
    var correctResponseMessage = 'Yes, you are correct! ';
    var incorrectResponseMessage = 'Sorry, that is not the correct response. ';

    //Icons to mark questions as correct or incorrect
    var correctResponseIcon = '<span><i class="far fa-check-circle"></i></span>';
    var incorrectResponseIcon = '<span><i class="far fa-times-circle"></i></span>';

    //Get array of elements for questions
    var questionDivs = document.getElementsByClassName('question');
    
    //populate questions on DOM for Yes and No questions
    for (var i = 0; i < yesAndNoQuestions.length; i++) {
      // set up imput to match input to question index in array
      var idName = 'quiz-response-' + i;
      questionDivs[i].innerHTML = '<h3>' + yesAndNoQuestions[i] + '</h3><input type="text" class="quiz-response" id=' + idName + ' placeholder="type yes/no"></input>'; 
    }

    updateScore(numCorrect, yesAndNoQuestions.length + guessANumberQuestions.length + 1);
    var quizResponses = document.getElementsByClassName('quiz-response');

    //add event listeners for input boxes for when enters answer
    for (var j = 0; j < quizResponses.length; j++) {
      quizResponses[j].addEventListener('keypress', function (event){
        var keyPressed = event.which || event.keyCode;
        
        //check to see if "Enter key is depressed"
        if (keyPressed === 13) {
          //tests that were used to extract value
          // console.log("Enter is pressed, check value in box");
          // console.log(event);
          // console.log("Value entered is " + event.srcElement.value);
          // console.log(this);

          var userResponse = event.srcElement.value.toLowerCase().trim();
          var questionNumber = parseInt(this.id[this.id.length - 1]);
          console.log('Response entered for question ' + (questionNumber + 1));
       
          if (userResponse === 'yes' || userResponse === 'no') {
            console.log('Valid response entered. User answered ' + userResponse + ' for question ' + (questionNumber + 1));
            console.log('input box is disabled');

            document.getElementById('instructions').style.backgroundColor = 'white';

            //disable field from further input
            console.log(this);
            this.placeholder = userResponse;


            if (userResponse === yesAndNoAnswers[questionNumber]) {
              console.log('Correct response entered for question ' + (questionNumber + 1));

              //display message for notifiction of correct response
              questionDivs[questionNumber].innerHTML += '    ' + correctResponseIcon + '<span class="correct">' + correctResponseMessage + yesAndNoExplanations[questionNumber] + '</span>';
              
              //update current score and append to DOM
              numCorrect += 1;
              updateScore(numCorrect, yesAndNoQuestions.length + guessANumberQuestions.length + 1);

            } else {
              console.log('j = ' + j);
              console.log('incorrect response entered');
              console.log(incorrectResponseMessage + yesAndNoExplanations[questionNumber]);
              
              //display message for notification of incorrect response
              questionDivs[questionNumber].innerHTML += '    ' + incorrectResponseIcon + '<span class="incorrect">' + incorrectResponseMessage + yesAndNoExplanations[questionNumber] + '</span>';
            }
          } else {
            console.log('Invalid response entered - try again');
            //reset this input field
            document.getElementById('instructions').style.backgroundColor = 'pink';
            this.value = '';
          }
        }
      });
    }
    //TODO refactor below a function for guessing game
    var userGuess = prompt('You have 3 guesses. ' + guessANumberQuestions[0]);

    while (isNaN(parseInt(userGuess))) {
      userGuess = prompt('Please enter a NUMBER. ' + guessANumberQuestions[0]);
    }

    var numGuessesRemaining = 2;

    while (numGuessesRemaining > 0 ) {
      var answer = guessANumberAnswers[0];
      if (parseInt(userGuess) === answer){
        alert (correctResponseMessage);
        numCorrect += 1;
        break;
      } else if (userGuess <= answer) {
        userGuess = prompt('Too low, guess again. ' + guessANumberQuestions[0]);
      } else {
        userGuess = prompt('Too High, guess again. ' + guessANumberQuestions[0]);
      }
      numGuessesRemaining -= 1;
    }
    alert('The number that I was thinking of was ' + guessANumberAnswers[0]);
    updateScore(numCorrect, + guessANumberQuestions.length + 1);
  }
};


