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
var timeLeft = 0;
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
        scoreEl.textContent = 'Your final score is '+ finalScore;
    } else {
        gameEndEl.style.display == 'none';
    }
}
function toggleScore() {
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
            answers.setAttribute("class","btn btn-primary p-3 m-2");
            answers.setAttribute("data-index", i);
            choicesEl.appendChild(answers);
            correctAnswer = questionsArr[currentQuestion].correct;
        });
    }
    else{
        finalScore = timeLeft
        timeLeft = 1
        quizPage();
        endGame();
    }
}

submitBtn.addEventListener("click", function(){
    endGame();
    var name = initialsEl.value.trim();
    localStorage.setItem(name, timeLeft);
    toggleScore;
});

backBtn.addEventListener("click", function(){
    toggleScore();
    startPage();
    timerEl.textContent = "Time: 120";
});

//timer func
function startTime(){
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if(timeLeft == 0){
            clearInterval(timerInterval);
            quizPage();
            endGame();
        }
    }, 1000);
}

//start quiz function
startBtn.addEventListener("click", function(){
    timeLeft = 120;
    currentQuestion = 0;
    startTime();
    startPage();
    quizPage();
    loadQuestion();

    choicesEl.addEventListener("click", function(event) {
        var element = event.target;
        if(element.matches("button")){
            var index = element.getAttribute("data-index");
            if(index == questionsArr[currentQuestion].correct){
                currentQuestion++;
                loadQuestion();
            } else {
                currentQuestion++;
                timeLeft -= 15;
                loadQuestion();
            }
        }
    })
})
console.log(questionsArr[currentQuestion].correct)