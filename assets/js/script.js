// creating an array of quiz questions that 
// includes their title, choices, and the answer
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if/else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed in ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
    }
]

// capturing html elements into variables as welll as 
// declaring variables 
var body = document.body;
var startBtn = document.querySelector('.start-btn');
var starter_screen = document.querySelector('#start-screen');
var question_screen = document.querySelector('#questions');
var end_screen = document.querySelector('#end-screen');
var titleEl = document.querySelector('#title')
var choicesEl = document.querySelector('#multi');
var submitBtn = document.querySelector('.submit');
var user_submit = document.getElementById('user-input');
var final_score = document.querySelector('#score');
var currentQuestionIndex = 0;
var timeLeft = 75;
var user_score;

// quiz countdown timer function
function countdown() {
    // caputring our timer html element
    var timerEl = document.querySelector('#time');
    // setting the timer equal to 75 from after game is started
    timerEl.textContent = timeLeft
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0) {
        // Decrement `timeLeft` by 1
        timeLeft--;
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timeLeft =  0;
        timerEl.textContent = '0';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // calls final screen function
        final_screen();
      }
    }, 1000);
}

// function that adds an on click to every button and determines
// what happens to the button that was clicked whether it 
// included the right answer or wrong answer
function questionClick(event) {
        // if the event target value returns false
        if(!(event.target.value.includes(questions[currentQuestionIndex].answer))){
            // decrementing the timer by 10 
            timeLeft = timeLeft - 10;
            var wrong_timer = 1;
            // setting the body background color to red when incorrect
            body.setAttribute('style', 'background-color: red');
            // timer of for the red screen to appear
            var timeInterval = setInterval(function () {
                if(wrong_timer > 0){
                    wrong_timer--;
                }else{
                    //after timer is over, interval is cleared and body background 
                    // goes back to default color
                    clearInterval(timeInterval);
                    body.setAttribute('style', 'background-color: #c7d5e4;');
                }   
            }, 1000);
        // else in which the event target value does include the right answer
        }else{
            var right_timer = 1;
            // body background set to green when correct
            body.setAttribute('style', 'background-color: #ADFF2F');
            // timer for green screen to be visible
            var timeInterval = setInterval(function () {
                if(right_timer > 0){
                    right_timer--;
                }else{
                    //after timer is over, interval is cleared and body background 
                    // goes back to default color
                    clearInterval(timeInterval);
                    body.setAttribute('style', 'background-color: #c7d5e4;');
                }   
            }, 1000);
        }
            // checking if current index is = 4
            if(currentQuestionIndex == 4){
                // captures user score/time after game ends
                user_score = timeLeft.toString();
                // set timeleft to 0
                timeLeft = 0;
                // increase currentQuestionIndex
                currentQuestionIndex++;
                // calls final screen function
   
            }else{
                // increase currentQuestionIndex 
                currentQuestionIndex++;
                // calls getquestion function
                getQuestion();
            }

        
}

// this function works on getting each index of our question object
// printing the question title, and printing each choice into a button 
// on the document
function getQuestion() {

// current question at our current index
var currentQuestion = questions[currentQuestionIndex];
// setting our #title id to a class of question
titleEl.setAttribute('class', 'question');
// printing our current question title onto the document
titleEl.textContent = currentQuestion.title;

// clearing out any choices that were previously on the screen
choicesEl.innerHTML = "";

// for each current question choice
currentQuestion.choices.forEach(function(choice, i){
    // creating button element
    var choiceBtn = document.createElement('button');
    // giving each button a class of choice
    choiceBtn.setAttribute('class', 'choice');
    // giving each button a value of the current choice
    choiceBtn.setAttribute('value', choice);
    // text content set to the choice button
    // each button has its own choice from
    // the current question index
    choiceBtn.textContent = i + 1 + '. '+ choice;

    // adding event listener to questionClick function
    choiceBtn.onclick = questionClick;
    // appending each button so they appear on the document
    choicesEl.appendChild(choiceBtn);

})
}

// function whihc helps eiuther hide or display a certain screen
function screenChange(x){
    // checks if classname is visible
    if(x.className === 'visible'){
        // sets attributes to hide screen
        x.setAttribute('style', 'display: none');
        x.setAttribute('class', 'hidden');
        // checks if classname is hidden
    }else if (x.className === 'hidden'){
        // sets attributes to show screen
        x.setAttribute('style', 'display: block');
        x.setAttribute('class', 'visible');
    }
}

function final_screen(){
    // sending question screen to be hidden
    screenChange(question_screen);
    // sending end screen to be shown
    screenChange(end_screen);
    // check if user let time run out or got a zero as score
    if(user_score == 0 || user_score == undefined){
        final_score.textContent = '0';
        // checks if user_score is a valid number
    }else{
        final_score.textContent = user_score;
    }
}

// play game function
function playgame(){
    // calls countdown function to start timer as game starts
    countdown();
    // sending start screen to be hidden
    screenChange(starter_screen);
    // sending question screen to be visible
    screenChange(question_screen);
    // calls get question function
    getQuestion();

}

// event listener to check when submit button is clicked on end screen
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    // stores user initials and score into index 0 of user array
    var user  = [user_submit.value+ user_score];
    // grabs any stored items in local storage
    var currentItems = localStorage.getItem('user-cred');
    // check if user didn't type any initials in submit form
    if(user_submit === ''){
        // displays alert message
        alert('You must enter a name for you highscore!');
    }else{
        // checks if anything was stored in local storage
        if(currentItems != undefined){
            // sends current local storage items and concats our user
            // submission items into local storage current items
            localStorage.setItem('user-cred', JSON.stringify(JSON.parse(currentItems).concat(user)));
        }else{
            // sends user submission to local storage
            localStorage.setItem('user-cred', JSON.stringify(user));
        }
        // sends user to highscore webpage after submission
        location.href = '/highscores.html';
    }
    
});

// start button event listener to start game
startBtn.addEventListener('click', playgame);