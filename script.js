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
        answer: ['Client', 'Server', 'Both', 'None'], 
        correct: 2,
    },
    {
        question: 'What is the correct Syntax to display "Hello World!" in an alert box?',
        answer: ['alert("Hello World!")', 'alertBox("Hello World!")', 'alert(Hello World!)'],
        correct: 0,
    },
    {
        question: 'How do you get the DOM element using the "id" with JavaScript?',
        answer: ['window.getElementById()', 'document.getElementById()', 'page.getElementById()', 'document.innerHTML.getElementById()'],
        correct: 1,
    },
    {
        question: 'How do you create a new function in JavaScript?',
        answer: ['new.function() {}', 'function "myNewFunction"() {}', 'var "myNewFunction" = function() {}', 'Both b and c'],
        correct: 3,
    },
    {
        question: 'How do define data as an Array in JavaScript?',
        answer: ['var Array = "1, 2, 3, 4";', 'var Array = 1, 2, 3, 4;', 'var Array = [1, 2, 3, 4]', 'None of the above.'],
        correct: 2,
    }
];

var currentQuestion = 0;
var timeLeft = 120;
var finalScore = 0;

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

function endGame() {
    if(gameEndEl.style.display == 'none'){
        gameEndEl.style.display == 'block';
    } else {
        gameEndEl.style.display == 'none';
    }
}

function showScore() {
    while (userScores.lastElementChild) {
        userScores.removeChild(userScores.lastElementChild);
      }
    if(scoreEl.style.display == "none"){
        scoreEl.style.display = "block"

        Object.keys(localStorage).forEach(element => {
            var user = document.createElement("li")
            user.textContent = element + " - " +localStorage.getItem(element)
            user.setAttribute('class', "bg-secondary text-white p-1 mb-2")
            userScores.appendChild(user)
            // console.log(element, element.value )
        });
    }
    else{
        scoreEl.style.display = "none"
    }
}

function loadQuestion() {
    while (choicesEl.lastElementChild) {
        choicesEl.removeChild(choicesEl.lastElementChild);
      }
    if(questionsArr[currentQuestion]){
        questionEl.textContent = questionsArr[currentQuestion].question
    
        questionsArr[currentQuestion].answer.forEach(function(element, i) {
            var answers = document.createElement("button");
            answers.textContent = element;
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
            quizPage();
        }
    }, 1000);
} 

//after completion or interval end show score and ask for initials, store score in local storage
// Starts the quiz
startBtn.addEventListener("click", function(){
    timer = 120
    questionNumber = 0
    startTimer();
    startPage();
    quizPage();
    loadQuestion();

    choicesEl.addEventListener("click", function (event) {
        var element = event.target
        if(element.matches("button")){
            var index = element.getAttribute("data-index")
            if(index == questionsArr[questionNumber].correct){
                questionNumber++;
                loadQuestion();
            } else {
                questionNumber++;
                timer -= 15;
                loadQuestion();   
            }
        }
    })
})



