
var remainSeconds = 60;
//global timeInterval, allow program to stop time in any functions.
var timeInterval;
// questions holds title and quiz questions, Choices holds list of answers and highScores,, Status bar holds status and buttons.
var questions = document.getElementById('questions');
var choices = document.getElementById('choices');
var statusBar = document.getElementById('status-bar');
var displayScore = document.getElementById('highScores');
var counter = document.getElementById("timeCounter");

// all quiz questions will be store in the quizQuestions array.
// five simple javascript questions.
var quizQuestions = [

    {
        question : "Which of the following function of String object extracts a section of a string and returns a new string?",
    
        answers : ["slice()", "split()", "replace()", "search()"],
    
        correctAnswer : "slice()"
    },

    {

        question : "Inside whitch HTML element do we put the JavaScript?",
        
        answers : ["javascript", "header", "body", "script"],
        
        correctAnswer : "script"
    },

    {

        question : "How do you write \"Hello World\" in an alert box?",
        
        answers : ["msg(\"Hello World\");" , "msgBox(\"Hello World\");", "alertBox(\"Hello Word\");", "alert(\"Hello World\");"],
    
        correctAnswer : "alert(\"Hello World\");"
    
    },

    {
        question : "How do you create a function in JavaScript?",

        answers : ["function = myFunction()", "function myFunction()", "function:myFunction()", "myFunction()"],

        correctAnswer : "function myFunction()"
    },

    {   
        question : "How to write a if statement for executing some code if \"i\" is not eqaul to 5?",

        answers : ["if (i<>5)", "if(i != 5)", "if i <> 5", "if i =!5 then"],

        correctAnswer : "if(i != 5)"

    }
];



// the time counter, set timer to 60 seconds. Finish test when time run out.
function timer (){
    
    remainSeconds = 60;   

    
    timeInterval = setInterval(function () { 
        

        counter.textContent = remainSeconds+" seconds remaining."  
        
        if(remainSeconds <= 0) {
            
            clearInterval(timeInterval);
            
            clearPage();

            testScore();
            
        }

        remainSeconds--;
        
    }, 1000);
    
}

// display question and display answer choices in a ordered list.
function dispalyQuestion (index) {
    
    var qTitle = document.createElement('h1');
    var qChoices = document.createElement('ol');
    var correctness = document.createElement('h2');
    var currenQues = quizQuestions[index];

    qTitle.textContent = currenQues.question;

    questions.appendChild(qTitle);

    for (var i = 0; i < currenQues.answers.length; i++){

        var list = document.createElement('li');
        var btn = document.createElement('button');

        btn.textContent = currenQues.answers[i];
        btn.setAttribute('class','choicesBtn');

        list.appendChild(btn);
        qChoices.appendChild(list);
        
    }

    choices.appendChild(qChoices);

    //when clicked, check if the answer is right.
    qChoices.addEventListener('click', function(event) {

        console.log(currenQues.correctAnswer);

        if (event.target.textContent === currenQues.correctAnswer){

            correctness.style.color = 'var(--rightGreen)';
            correctness.textContent = 'Correct';
            
        }else {

            correctness.style.color = 'var(--alertRed)';
            correctness.textContent = 'Wrong';

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

                while (statusBar.firstChild){
                    statusBar.removeChild(statusBar.firstChild);
                }

            }, 500);

            while (questions.firstChild){
                questions.removeChild(questions.firstChild);
            }
        
            while (choices.firstChild){
                choices.removeChild(choices.firstChild);
            }

            dispalyQuestion(index);


        } else if(index >= quizQuestions.length){
            // when index reach the end of quizQuestions array, stop timer, end quiz, call function to display score.
            clearInterval(timeInterval);

            setTimeout(function(){

                while (statusBar.firstChild){
                    statusBar.removeChild(statusBar.firstChild);
                }
               // clearPage();

                //testScore();

            }, 500);

            while (questions.firstChild){
                questions.removeChild(questions.firstChild);
            }
        
            while (choices.firstChild){
                choices.removeChild(choices.firstChild);
            }

            testScore();

        } 

    }, {once : true});


}

function testScore () {

    document.getElementById('timeCounter').textContent = '';
    var finalScore = remainSeconds;
    
    var title = document.createElement('h1');
    var subForm = document.createElement('form');
    var label = document.createElement('label');
    var testResult = document.createElement('p');
    var stuName = document.createElement('input');
    var button = document.createElement('button');
    var message = document.createElement('p');

    title.textContent = "All Done";
    testResult.textContent = "your Score is : "+remainSeconds;
    label.textContent = "Please enter your initial:";
    button.textContent = "submit";

    label.setAttribute('for', 'initial');
    stuName.setAttribute('type', 'text');
    stuName.setAttribute('id', 'initial');
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'optionBtn');
    

    questions.appendChild(title);
    choices.appendChild(testResult);
    subForm.appendChild(label);
    subForm.appendChild(stuName);
    subForm.appendChild(button);
    choices.appendChild(subForm);
    statusBar.appendChild(message);

    button.addEventListener('click', function(){
        event.preventDefault();
        var stuInit = stuName.value;
        var highScores ;

        var currentScore = {
            initail : stuInit,
            score : finalScore,
        };
        
        if (stuInit === '') {
            alert("Initail cannot be blank");
        }else {
            highScores = JSON.parse(localStorage.getItem('highScores'));

            if (highScores === null){
                highScores=[currentScore];
            } else {
                highScores.push(currentScore);
            }
            console.log(highScores);
            
            // use bubble sort to sort highScores form large to small

            for (let i = highScores.length; i > 0; i--) {
                var temp;

                for (let j = 0; j < (i-1); j++) {
                    
                    if(parseInt(highScores[j].score) < parseInt(highScores[j+1].score)){
                        temp = highScores[j];
                        highScores[j] = highScores[j+1];
                        highScores[j+1] = temp;
                    }
                    
                }
                
            }

            localStorage.setItem("highScores" , JSON.stringify(highScores));
            showHighScores();
        }

    });


    
}

function showHighScores () {

    clearInterval(timeInterval);
    counter.textContent='';
    clearPage();

    var title = document.createElement('h1');
    var orderList = document.createElement('ol');
    var goBackBtn = document.createElement('button');
    var clearScoreBtn = document.createElement('button');

    title.textContent = 'HighScores';
    questions.appendChild(title);
    // read all highscore from local storage.
    var highScores = JSON.parse(localStorage.getItem('highScores'));
    //display highscore in a ordered list.
    if (highScores != null) {

        for (var i = 0; i<highScores.length; i++){
            var listItem = document.createElement('li');
            listItem.textContent = highScores[i].initail+' - '+highScores[i].score;
            orderList.appendChild(listItem);
            listItem.style.backgroundColor ="var(--spaceGray)";
        }

    }
    
    choices.appendChild(orderList);

    goBackBtn.textContent = "Go Back";
    clearScoreBtn.textContent = "Clear HighScores";

    goBackBtn.setAttribute('class', 'optionBtn');
    clearScoreBtn.setAttribute('class', 'optionBtn');

    statusBar.appendChild(goBackBtn);
    statusBar.appendChild(clearScoreBtn);
    //go back button will start the quiz again.
    goBackBtn.addEventListener ('click', function(){
        clearPage();
        initPage();
    });

    // ask user if they want to delete all highscores. if confirmed, delete list from page and local storage.
    clearScoreBtn.addEventListener ('click', function(){
    
        if (confirm('Delete all High Scores?')) {
            orderList.innerHTML = "";
            localStorage.removeItem('highScores');
        }

    });
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


function initPage () {
    
    var title = document.createElement('h1');
    var intro = document.createElement('p');
    var startBtn = document.createElement('button');    
    
    counter.textContent = "60 seconds remaining.";
    title.textContent = "JavaScript Coding Quiz";
    intro.textContent = "Try to answer the following JavaScript questions within the time limit. Every incorrect answers will penatize your score & time by 10 seconds.";
    startBtn.textContent = "start";
    startBtn.setAttribute('class', 'optionBtn');
    
    questions.appendChild(title);
    choices.appendChild(intro);
    choices.appendChild(startBtn);
    
    // when click, clear page, start timer, display first question;
    startBtn.addEventListener('click', function() {
        
        clearPage();
        timer();
                
        dispalyQuestion(0);      

    });

    displayScore.addEventListener('click', showHighScores);
}

initPage();

