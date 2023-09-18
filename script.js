var rootEl = document.getElementById('root');
var startPageEl = document.getElementById('startPage');
var startHighscoresBtn = document.getElementById('startHighscore');
var startBtn = document.getElementById('startbtn');
var quizEl = document.getElementById('quiz');
var timerEl = document.getElementById('timer');
var questionCardEl = document.getElementById('questioncard');
var questionEl = document.getElementById('question');
var choicesEl = document.getElementById('choices');
var wrongEl = document.getElementById('wrong');
var correctEl = document.getElementById('correct');
var resultEl = document.getElementById('result');
var gameEndEl = document.getElementById('gameEnd');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');
var highscoreCardEl = document.getElementById('highscoreCard');
var scoreInitialsEl = document.getElementById('scoreInitials');
var lastScoreEl = document.getElementById('lastscore');
var highScoresEl = document.getElementById('highscores');
var highScoresInitialsEl = document.getElementById('highscores-initials');
var backBtn = document.getElementById('back');
var clearBtn = document.getElementById('clear');
var submitBtn = document.getElementById('submit');

//Questions
var questionsArr = [
    {
        question: 'JavaScript is a ___-side programming language.',
        optionA: 'Client',
        optionB: 'Server',
        optionC: 'Both',
        optionD: 'None',
        correct: 'c',
    },
    {
        question: 'What is the correct Syntax to display "Hello World!" in an alert box?',
        optionA: 'alert("Hello World!")',
        optionB: 'alertBox("Hello World!")',
        optionC: 'alert(Hello World!)',
        optionD: 'displayAlert("Hello World!")',
        correct: 'a',
    },
    {
        question: 'How do you get the DOM element using the "id" with JavaScript?',
        optionA: 'window.getElementById()',
        optionB: 'document.getElementById()',
        optionC: 'page.getElementById()',
        optionD: 'document.innerHTML.getElementById()',
        correct: 'b',
    },
    {
        question: 'How do you create a new function in JavaScript?',
        optionA: 'new.function() {}',
        optionB: 'function "myNewFunction"() {}',
        optionC: 'var "myNewFunction" = function() {}',
        optionD: 'Both b and c',
        correct: 'd',
    },
    {
        question: 'How do define data as an Array in JavaScript?',
        optionA: 'var Array = "1, 2, 3, 4";',
        optionB: 'var Array = 1, 2, 3, 4;',
        optionC: 'var Array = [1, 2, 3, 4]',
        optionD: 'None of the above.',
        correct: 'c',
    }
];

var currentQuestion = 0;
var timeLeft = 120;
var finalScore = 0;

//event listeners
startBtn.addEventListener("click", start);
startHighscoresBtn.addEventListener("click", showHighscores);
//buttons inside highscore window
backBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearScores);
//end of game buttons
submitBtn.addEventListener("click", submitScore);

//screen change functions 
function startPage() {
    if(startPageEl.style.display == 'none'){
        startPageEl.style.display = 'block';
    } else {
        startPageEl.style.display = 'none';
    }
}

function quizPage() {
    if(quizEl.style.display == 'none'){
        quizEl.style.display = 'block';
    } else {
        quizEl.style.display = 'none';
    }
}

function wrongPage() {
    if(wrongEl.style.display == "none"){
        wrongEl.style.display = "block";
        var time = 1;
        var timerInterval = setInterval(function() {
            time--;
            if(time == 0){
                clearInterval(timerInterval);
                wrongPage();
            }
        }, 1000)
    }
    else{
        wrongEl.style.display = "none";
    }
}
//same as wrong page displays on a one second timer
function correctPage() {
    if(correctEl.style.display == "none"){
        correctEl.style.display = "block";
        var time = 1;
        var timerInterval = setInterval(function() {
            time--;
            if(time == 0){
                clearInterval(timerInterval);
                correctPage();
            }
        }, 1000)
    }
    else{
        correctEl.style.display = "none";
    }
}

//found on Stack Overflow
function loadQuestion() {
    while (choicesEl.lastElementChild) {
        choicesEl.removeChild(choicesEl.lastElementChild);
      }
    if(questionsArr[currentQuestion]){
        choicesEl.textContent = questionsArr[currentQuestion].question
    
        questionsArr[currentQuestion].answer.forEach(function(element, i) {
            var answers = document.createElement("button");
            answers.textContent = element;
            console.log(i);
            answers.setAttribute("class","btn btn-primary p-3 m-2 ");
            answers.setAttribute("data-index", i);
            choicesEl.appendChild(answers);
        });
    }
    else{
        finalScore = timer
        timeLeft = 1
    }
}
//timer func
function startTimer() {
    var timeInterval = setInterval(function() {
        timeLeft --;
        timerEl.textContent = timeLeft;
        if (timeLeft == 0) {
            clearInterval(timeInterval);
            endGame();
        }
    }, 1000);
} 
//start game func
function start() {
    // randomizeArr();
    startPageEl.style.display = "none";
    quizEl.style.display = "block";
    displayQuestion();
    startTimer();
}


//after completion or interval end show score and ask for initials, store score in local storage


