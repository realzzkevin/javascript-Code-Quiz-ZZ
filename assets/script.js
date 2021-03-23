var highScores = [];
var currentScore = 0;
var remainSeconds = 60;

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

}

function saveScores () {

}

function initPage () {

}

function startQuiz(){

}

initPage();