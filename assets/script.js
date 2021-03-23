var highScores = [];
var currentScore = 0;
var remainSeconds = 60;
var questions = document.getElementById('questions');
var choices = document.getElementById('choices');
var status = document. getElementById('status');
var displayScore = document.getElementById('highScores');

// all quiz questions will be store in arry quizQuestions.
var quizQuestions = [];
//sample question object.
quizQuestions[0] = {

    question : "who invented JavaScript",

    answers : ["Douglas crockford", "Sheryl Sandberg", "Brendan Eich"],

    CorrectAnswer : "Brendan Eich"
};

quizQuestions[1] = {

    question : "inside with HTML elemment do we put the JavaScript?",
    
    answers : ["<javascript>", "<header>", "<body>", "<script>"],
    
    CorrectAnswer : "<script>"
};


console.log(quizQuestions);


function timer (){
    
    remainSeconds = 60;

    var counter = document.getElementById("timeCounter");

    
    var timeInterval = setInterval(function () {
        
        remainSeconds--;

        
        if(remainSeconds ===0) {
            
            clearInterval(timeInterval);
            
            quizOver();
            
        }
        
    }, 1000);
    
}

function dispalyQuestion (question) {
    
    
}

function quizOver (str) {
    
}

function showHighScores () {
    event.preventDefault();
    clearPage();
    
}

function saveScores () {
    
}

function clearPage () {
    event.stopPropagation();
    
    while (questions.firstChild){
        questions.removeChild(questions.firstChild);
    }

    while (choices.firstChild){
        choices.removeChild(choices.firstChild);
    }

    while (status.firstChild){
        status.removeChild(choices.firstChild);
    }
 
}

function startQuiz(){
    event.stopPropagation();
    clearPage();
    timer();
}



function initPage () {

    var title = document.createElement('h1');
    var intro = document.createElement('p');
    var startBtn = document.createElement('button');
    

    title.textContent = "this is the question title";
    intro.textContent = "do you want to start the quiz?";
    startBtn.textContent = "start";

    questions.appendChild(title);
    choices.appendChild(intro);
    choices.appendChild(startBtn);

    console.log(choices.childNodes);

    startBtn.addEventListener('click', startQuiz);

    displayScore.addEventListener('click', showHighScores);
}

initPage();





//
