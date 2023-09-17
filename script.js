var rootEl = document.getElementById('root');
var startPageEl = document.getElementById('startPage');
var startHighscoresBtn = document.getElementById('startHighscore');
var startBtn = document.getElementById('startbutton');
var quizEl = document.getElementById('quiz');
var timerEl = document.getElementById('timer');
var questionCardEl = document.getElementById('questioncard');
var questionEl = document.getElementById('question');
var choicesEl = document.getElementById('choices');
var chioices = {
    a: document.getElementById('a'),
    b: document.getElementById('b'),
    c: document.getElementById('c'),
    d: document.getElementById('d')
}
var resultEl = document.getElementById('result');
var gameEndEl = document.getElementById('gameEnd');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');
var highscoreCardEl = document.getElementById('highscoreCard');
var scoreInitialsEl = document.getElementById('scoreInitials');
var lastScoreEl = document.getElementById('lastscore');
var highScoresEl = document.getElementById('highscores');
var highScoresInitialsEl = document.getElementById('highscores-initials');

//Questions
var questionsArr = [
    {
        question: 'JavaScript is a ___-side programming language.',
        optionA: 'Client',
        optionB: 'Server',
        optionC: 'Both',
        optionD: 'None',
        correct: 'C',
    },
    {
        question: 'What is the correct Syntax to display "Hello World!" in an alert box?',
        optionA: 'alert("Hello World!")',
        optionB: 'alertBox("Hello World!")',
        optionC: 'alert(Hello World!)',
        optionD: 'displayAlert("Hello World!")',
        correct: 'A',
    },
    {
        question: 'How do you get the DOM element using the "id" with JavaScript?',
        optionA: 'window.getElementById()',
        optionB: 'document.getElementById()',
        optionC: 'page.getElementById()',
        optionD: 'document.innerHTML.getElementById()',
        correct: 'B',
    },
    {
        question: 'How do you create a new function in JavaScript?',
        optionA: 'new.function() {}',
        optionB: 'function "myNewFunction"() {}',
        optionC: 'var "myNewFunction" = function() {}',
        optionD: 'Both b and c',
        correct: 'D',
    },
    {
        question: 'How do define data as an Array in JavaScript?',
        optionA: 'var Array = "1, 2, 3, 4";',
        optionB: 'var Array = 1, 2, 3, 4;',
        optionC: 'var Array = [1, 2, 3, 4]',
        optionD: 'None of the above.',
        correct: 'C',
    }
];

var currentQuestion = 0;

//Randomize order of questions
// Schwartzian transform algorithm found on Stack Overflow
function randomizeArr() {    
    var shuffledArr = questionsArr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
   
    console.log(shuffledArr);
}    

function renderQuestion(shuffledArr) {
    let q = randomizeArr[currentQuestion];
    question.innerHTML = "<p>"=q.question +"</p>";
    choices.a.innerHTML = 
}
//switch from start screen to question screen start timer with minus time for wrong

//log answer and record for score in localstorage

//after completion or interval end show score and ask for initials, store score in local storage

//button that displays element with highscores pulled from local storage
