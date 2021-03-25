var highScores = [];
var currentScore = 0;
var remainSeconds = 60;
var timeInterval;
var questions = document.getElementById('questions');
var choices = document.getElementById('choices');
var statusBar = document.getElementById('status-bar');
var displayScore = document.getElementById('highScores');

// all quiz questions will be store in arry quizQuestions.
var quizQuestions = [];
//sample question object.
quizQuestions[0] = {

    question : "who invented JavaScript",

    answers : ["Douglas crockford", "Sheryl Sandberg", "Brendan Eich"],

    correctAnswer : "Brendan Eich"
};

quizQuestions[1] = {

    question : "inside with HTML elemment do we put the JavaScript?",
    
    answers : ["javascript", "header", "body", "script"],
    
    correctAnswer : "script"
};


console.log(quizQuestions);


function timer (){
    
    remainSeconds = 60;

    var counter = document.getElementById("timeCounter");

    
    timeInterval = setInterval(function () { 
        

        counter.textContent = remainSeconds+" seconds remaining"  
        
        if(remainSeconds <=0) {
            
            clearInterval(timeInterval);
            
            testScore();
            
        }

        remainSeconds--;
        
    }, 1000);
    
}

function dispalyQuestion (index) {
    
    /*if (index >= quizQuestions.length){
        return;
    }*/
    var qTitle = document.createElement('h1');
    var qChoices = document.createElement('ol');
    var correctness = document.createElement('h2');
    var currenQues = quizQuestions[index];

    qTitle.textContent = currenQues.question;

    questions.appendChild(qTitle);

    for (var i = 0; i < currenQues.answers.length; i++){

        var list = document.createElement('li');

        list .innerHTML = '<button class=\'btn\'>'+ currenQues.answers[i]+ '</button>'
        qChoices.appendChild(list);
        
    }

    choices.appendChild(qChoices);


    qChoices.addEventListener('click', function(event) {

        console.log(currenQues.correctAnswer);

        if (event.target.textContent === currenQues.correctAnswer){

            correctness.textContent = 'Correct';
            
        }else {

            correctness.textContent = 'Wrong'

            if (remainSeconds >= 10){

                remainSeconds = remainSeconds -10;

            } else {
                remainSeconds = 0;
            }
        }
        
        statusBar.appendChild(correctness);

        index++;

        if (index < quizQuestions.length){

            setTimeout(function(){

                clearPage();

                dispalyQuestion(index);

            }, 1000);


        } else if(index >= quizQuestions.length){

            clearInterval(timeInterval);

            setTimeout(function(){

                clearPage();

                testScore();

            }, 1000);

        } 

    }, {once : true});


}

function testScore () {

    var title = document.createElement('h1');
    var subForm = document.createElement('form');
    var label = document.createElement('label');
    var testResult = document.createElement('p');
    var stuName = document.createElement('input');
    var button = document.createElement('button');

    title.textContent = "All Done";
    testResult.textContent = "your Score is : "+remainSeconds;
    label.textContent = "Please enter your initial:";
    button.textContent = "submit";

    label.setAttribute('for', 'initial');
    stuName.setAttribute('type', 'text');
    stuName.setAttribute('id', 'initial');
    button.setAttribute('type', 'submit');
    

    questions.appendChild(title);
    choices.appendChild(testResult);
    subForm.appendChild(label);
    subForm.appendChild(stuName);
    subForm.appendChild(button);
    choices.appendChild(subForm);

    


    
}

function showHighScores () {

    clearPage();
    
}

function saveScores () {
    
}
// delete all child nodes in 3 section elements. 
function clearPage () {

    
    while (questions.firstChild){
        questions.removeChild(questions.firstChild);
    }

    while (choices.firstChild){
        choices.removeChild(choices.firstChild);
    }

    while (statusBar.firstChild){
        statusBar.removeChild(statusBar.firstChild);
    }
 
}

function startQuiz(){

    clearPage();
    timer();

    var qIndex = 0;

    dispalyQuestion(qIndex);
}



function initPage () {

    var title = document.createElement('h1');
    var intro = document.createElement('p');
    var startBtn = document.createElement('button');
    

    title.textContent = "JavaScript Coding Quiz";
    intro.textContent = "do you want to start the quiz?";
    startBtn.textContent = "start";

    questions.appendChild(title);
    choices.appendChild(intro);
    choices.appendChild(startBtn);

    startBtn.addEventListener('click', startQuiz);

    displayScore.addEventListener('click', showHighScores);
}

initPage();





//
