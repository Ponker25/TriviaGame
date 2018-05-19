
//     var triviaTimer = new Time("00:10").getTime();
    
//     var x = setInterval(function()) {
    
//     // Get todays date and time
//     var now = new Time().getTime();
    
//     // Find the distance between now an the count down date
//     var distance = triviaTimer - now;
    
//     // Time calculations for days, hours, minutes and seconds
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//     // Output the result in an element with id="demo"
//     document.getElementById("timerDisplay").innerHTML = minutes + "m " + seconds + "s ";
    
//     // If the count down is over, write some text 
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("timerDisplay").innerHTML = "EXPIRED";
//     }
// }, 1000);
// // 

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionsIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionsIndex];
}

Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer) {
    this.questionIndex++;

    if(this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

console.log("Test")

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}

console.log("Test")

function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        
        // try for looping through the question if it doesnt work try it inside the choices loop
        Quiz.prototype.printQuestions = function(){
            var questionString = "";
        
            for(var i = 0; i < questions.length; i++){
                questionString += questions[i].text + " , ";
            }
            console.log(questionstring);
        }

        // show choices 
        var choices = quiz.getQuestionIndex().choices;
            for (var i = 0; i < choices.length; i++) {
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
                console.log(choices);
        }
        showProgress();
    }
};

function guess (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
            quiz.guess(guess);
            populate();
            console.log(guess);
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionsIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHtml = "<h1>How well do you know 007?<h1>";
        gameOverHtml += "<h2 id='score'>Your scores: " + quiz.score + "</h2>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHtml;
};

// <!-- * Shows only one question until the player answers it or their time runs out.

var questions = [
    new Question("Which agent supplies Bond with all of his gadgets?", ["Q", "M", "V", "A"], "Q"),
    new Question("Which actor plays Bond in GoldenEye?", ["Roger Moore", "Timothy Dalton", "Sean Connery", "Pierce Brosnan"], "Pierce Brosnan"),
    new Question("What secret service agency does 007 work for?", ["MI5", "MI6", "MI7", "MI8"], "MI6"),
    new Question("What is the title of the first James Bond movie?", ["Dr. No", "Casino Royale", "For Your Eyes Only", "License to Kill"], "Dr. No"),
    new Question("What kind of car does James Bond drive in Moonraker?", ["Aston Martin", "BMW", "Cadillac", "None"], "None"),
];

var quiz = new Quiz(questions);

populate();

console.log("Test")
// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

// * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.