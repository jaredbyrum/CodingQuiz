var rootEl = document.getElementById('root');
var startPageEl = document.getElementById('startPage');
var startHighscoresBtn = document.getElementById('highscores');
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
var highScoresEl = document.getElementById('highscoreList');
var highScoresInitialsEl = document.getElementById('highscores-initials');
var backBtn = document.getElementById('back');
var clearBtn = document.getElementById('clear');
var submitBtn = document.getElementById('submit');
var userScoresEl = document.getElementById('userscores')

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
var highscores = [];
var currentQuestion = 0;
var timeLeft = 120;
//cleaned up timer with help from instructor in office hours
var timerInterval;
function updateTimer(){
    timerEl.textContent = "Time: "+ timeLeft;
}
function timerFunc(){
        timerInterval = setInterval(function(){
            if(timeLeft > 0){
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
function endGame(){
    quizEl.style.display = "none";
    gameEndEl.style.display = "block";
    console.log(timeLeft);
    scoreEl.textContent = "Your Score: "+ timeLeft;
}

//loadquestion func
function loadQuestion(){
    while(choicesEl.lastElementChild){
        choicesEl.removeChild(choicesEl.lastElementChild);
    }
    if(currentQuestion < questionsArr.length){
        questionEl.textContent = questionsArr[currentQuestion].question;
        questionsArr[currentQuestion].answer.forEach(function(element, i){
        var button = document.createElement("button");
        button.textContent = element;
        button.setAttribute("class", "btn btn-danger m-4 p-4");
        button.setAttribute("data-index", i);
        choicesEl.appendChild(button);
        // console.log("data-index");    
        }) 
    } else {
         endGame();
        clearInterval(timerInterval);
        return;
    }
}

//start quiz button 
startBtn.addEventListener("click", function(){
    timerFunc();
    startPageEl.style.display = "none";
    quizEl.style.display = "block";
    currentQuestion = 0;
    loadQuestion(currentQuestion);
})
 
choicesEl.addEventListener("click", function(event){
    let choice = event.target;
    if (choice.matches("button")){
        let index = choice.getAttribute("data-index");
        if(index != questionsArr[currentQuestion].correct){
            timeLeft -= 10;
        }     
            currentQuestion++;
            updateTimer();
            loadQuestion();
    }
})
//logging scores code foubnd on STack Overflow
submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    var name = initialsEl.value;
    function saveHighScore(name, timeLeft){
        localStorage.setItem(name, name + ": " + timeLeft)
    }
    if (name === ""){
        alert("Initials input cannot be empty! Please try again");
    } else {
        saveHighScore(name, timeLeft);
        var score = localStorage.getItem(name);
        highscores.push(score) 
        //sorting function doesnt work beucase initaials at beginning
        var html = "";
        for (var i = 0; i < highscores.length; i++){
            html += "<li>" + highscores[i] + "</li>";
        }
        userScoresEl.innerHTML = html;
    }
    console.log(highscores);
    console.log(html);
})

startHighscoresBtn.addEventListener('click', function(event){
    event.preventDefault();
    startPageEl.style.display = 'none';
    gameEndEl.style.display = 'none';
    quizEl.style.display = 'none'
    clearInterval(timerInterval);
    highscoreCardEl.style.display = 'block';
    
})
//clear scores
clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.localStorage.clear();
    highscores = [];
    userScoresEl.innerHTML = highscores
})

backBtn.addEventListener("click", function(event){
    event.preventDefault();
    highscoreCardEl.style.display = 'none';
    startPageEl.style.display = 'block';
    currentQuestion = 0
    timeLeft = 120
    timerEl.textContent = "Time: 120"
})