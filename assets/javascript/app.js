var timeLeft = 10
 var timerId
function startTimer() {
    $('#timerDisplay').text(`Time Remaining = 00:${timeLeft >= 10 ? timeLeft : "0" + timeLeft}`)
    timerId = setInterval(timer, 1000)
}
function timer() {
    timeLeft--
    $('#timerDisplay').text(`Time Remaining = 00:${timeLeft >= 10 ? timeLeft : "0" + timeLeft}`)
    if(timeLeft === 0){
        clearInterval(timerId)
        ++quiz.questionsIndex;
        if (!(quiz.isEnded())) {
            populate();
        }
    }
}

console.log(this);

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionsIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    console.log(this.questionsIndex);
    return this.questions[this.questionsIndex];
}

Quiz.prototype.isEnded = function() {
    console.log(this.questionsIndex , "this is in IsEnded");
    return this.questionsIndex >= (this.questions.length);
}

Quiz.prototype.guess = function(answer) {
    
    if(this.getCurrentQuestion().correctAnswer(answer)) {
        this.score++;
        ++this.questionsIndex;
        if ( !(this.isEnded() )) {
            clearInterval(timerId)
            populate();
        }
    }
    else{

        ++this.questionsIndex;
        if ( !(this.isEnded()) ) {
            clearInterval(timerId)
            populate();
        }
    }

}
Quiz.prototype.printQuestions = function(){
        var questionString = "";
    
        for(var i = 0; i < this.questions.length; i++){
            questionString += this.questions[i].text + " , ";
        }
        console.log(questionstring);
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

console.log("Test");

var questions = [
    new Question("Which agent supplies Bond with all of his gadgets?", ["Q", "M", "V", "A"], "Q"),
    new Question("Which actor plays Bond in GoldenEye?", ["Roger Moore", "Timothy Dalton", "Sean Connery", "Pierce Brosnan"], "Pierce Brosnan"),
    new Question("What secret service agency does 007 work for?", ["MI5", "MI6", "MI7", "MI8"], "MI6"),
    new Question("What is the title of the first James Bond movie?", ["Dr. No", "Casino Royale", "For Your Eyes Only", "License to Kill"], "Dr. No"),
    new Question("What kind of car does James Bond drive in Moonraker?", ["Aston Martin", "BMW", "Cadillac", "None"], "None"),
];

var quiz = new Quiz(questions);

function populate() {
    timeLeft = 10
    startTimer()
    console.log(quiz.isEnded());
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        console.log("hello from inside populate before quiz clg");
        console.log(quiz.getCurrentQuestion().text);
       $("#question").text(quiz.getCurrentQuestion().text)
        
        // try for looping through the question if it doesnt work try it inside the choices loop
       

        // show choices 
        var choices = quiz.getCurrentQuestion().choices;

        function populateLoop(params) {
            console.log("populate loop");
            for (var i = 0; i < choices.length; i++) {
                $("#choice" + i).text(choices[i])
                guess("btn" + i, choices[i]);
                // console.log(choices[i]);
            }
        }
        populateLoop()
        showProgress();
    }
};

function guess (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        if ( !(quiz.isEnded() )) {
            quiz.guess(guess);
            console.log(guess);
        }else{
            clearInterval(timerId)
            populate();
        }
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionsIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    console.log("show scores is running");
    var gameOverHtml = "<h1>How well do you know 007?<h1>";
        gameOverHtml += "<h2 id='score'>Your Score: " + quiz.score + "</h2>";
        var element = $("#quiz");
        element.html(gameOverHtml)
};

// <!-- * Shows only one question until the player answers it or their time runs out.



populate();

console.log("Test")
// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

// * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.