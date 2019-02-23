var currentAnswer;
var isAnswerCorrect;
var nextQuestion = 0;
var totalQuestion;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var countdownTimer;
var next = true;

var trivia = [{
        question: "Where did Harry Potter go to school?",
        answerOptions: ["Hogwarts", "Neverland", "Mordor", "Dreamland"],
        answer: "Hogwarts",
        picture: "./assets/images/hogwartsschoolpotter.jpg"
    },
    {
        question: "What is Darth Vader's real name?",
        answerOptions: ["Anakin Skywalker", "Nat Skywalker", "Cade Skywalker", "Ben Skywalker"],
        answer: "Anakin Skywalker",
        picture: "./assets/images/darth_vader.jpg"
    },
    {
        question: "Who sang the theme song from Titanic?",
        answerOptions: ["Celine Dion", "Madonna", "Beyonce", "Barbra Streisand"],
        answer: "Celine Dion",
        picture: "./assets/images/titanic.jpg"
    },
    {
        question: "How do Anna and Elsa know each other in Frozen?",
        answerOptions: ["Neighbors", "Friends", "Sisters", "Cousins"],
        answer: "Sisters",
        picture: "./assets/images/Disney+Frozen.jpg"
    },
    {
        question: "Who was the main villain in Avengers: Infinity War?",
        answerOptions: ["Ronan", "Thanos", "Malekith", "Nebula"],
        answer: "Thanos",
        picture: "./assets/images/Thanos-infinity-stone.jpg"
    },
    {
        question: "Who directed Inception?",
        answerOptions: ["Paul Thomas Anderson", "Quentin Tarantino", "Martin Scorsese", "Christopher Nolan"],
        answer: "Christopher Nolan",
        picture: "./assets/images/Inception-Building-curve.jpg"
    },
    {
        question: "What island is Jurassic Park on?",
        answerOptions: ["Isla Cruces", "Isla Fisher", "Isla Fritos", "Isla Nublar"],
        answer: "Isla Nublar",
        picture: "./assets/images/jurassic_park.jpg"
    },
    {
        question: "What volcano does Frodo Baggins toss the One Ring into?",
        answerOptions: ["Mount Peril", "Mount Fate", "Mount Doom", "Mount Fire"],
        answer: "Mount Doom",
        picture: "./assets/images/lord_of_ring.jpg"
    },
    {
        question: "What fictional African nation is Black Panther from?",
        answerOptions: ["Latveria", "Val Verde", "Wakanda", "Takistan"],
        answer: "Wakanda",
        picture: "./assets/images/wakanda.jpg"
    },
    {
        question: "What superhero team did Deadpool create in Deadpool 2?",
        answerOptions: ["X-Team", "X-Factor", "X-Guys", "X-Force"],
        answer: "X-Force",
        picture: "./assets/images/x-force.jpg"
    }
];

function shuffleArray(temparr) {
    for (var i = temparr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = temparr[i];
        temparr[i] = temparr[j];
        temparr[j] = temp;
    }
    return temparr;
}

function loadQuestion() {
    if (nextQuestion < trivia.length) {
        timer();
        clearScreen();
        questionCounter();
        

        $("<h2/>", {
            text: trivia[nextQuestion].question
        }).appendTo("#loadQuestion");

        currentAnswer = trivia[nextQuestion].answer.split(" ").join("");
        var temparray = trivia[nextQuestion].answerOptions.slice(0);
        temparray = shuffleArray(temparray);
        for (var i = 0; i < temparray.length; i++) {
            $("<button/>", {
                "class": "button",
                "id": temparray[i].split(" ").join(""),
                html: temparray[i],
            }).appendTo("#answerOptions");
        }
        next = true;
    }   
}

function checkAnswer() {
        if (currentAnswer === isAnswerCorrect) {
            console.log("answer Correct");
            correct = correct + 1;
            correctAnswered(correct);
            callLoadQuestion();

        } else {
            console.log("answer incorrect");
            incorrect = incorrect + 1;
            incorrectAnswered();
            callLoadQuestion();

        }
}

function clearScreen() {
    $(".clear").empty();

}

function callLoadQuestion () {
    setTimeout(
        function () {

            if (nextQuestion + 1 === totalQuestion) {
                callEndGame ();
            }
            else {
                nextQuestion++;
                loadQuestion();
            }
        }, 3000
    );
}

function timer () {
    var timeleft = 30;
    countdownTimer = setInterval(function () {
        $("#questionTimer").text(timeleft + " seconds remaining");
        timeleft -= 1;
        if (timeleft < 0) {
            stopTimer ();
            unanswered = unanswered + 1;
            incorrectAnswered();
            callLoadQuestion();
        }
    }, 1000);
}

function stopTimer() {
    console.log("stop timer");
    clearInterval(countdownTimer);
}

function callEndGame () {
    setTimeout(
        function () {
            endGame();
        }, 3000
    );
}

function loadImage () {
    $("<img/>", {
        "class": "img-fluid",
        src: trivia[nextQuestion].picture
    }).appendTo("#image");
}

function questionCounter() {
    $("#totalQuestion").text((nextQuestion + 1) + "/" + totalQuestion);
}

function correctAnswered(correct) {
    loadImage ();
    var correctInput = $("#" + isAnswerCorrect);
    correctInput.addClass("correct");
    correctInput.html("&#10003; " + correctInput.text());
    $("#correctAnswered").text("Correct: " + correct);
}

function incorrectAnswered() {
    loadImage ();
    var incorrectInput = $("#" + isAnswerCorrect);
    var correct = $("#" + currentAnswer);


    correct.addClass("correct");
    correct.html("&#10003; " + correct.text());
    incorrectInput.addClass("incorrect");
    incorrectInput.html("&#10007; " + incorrectInput.text());
}

function endGame () {
    clearScreen();
    $("<h4/>").text("Correct: " + correct).appendTo("#score");
    $("<h4/>").text("Incorrect: " + incorrect).appendTo("#score");
    $("<h4/>").text("Unanswered: " + unanswered).appendTo("#score");
    $("<button>", {
        "id" : "start",
        "type": "button",
        "class" : "btn btn-light",
        text: "RESET"
    }).appendTo("#score");

}

function startGame () {
    nextQuestion = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    
    $("#correctAnswered").text("Correct: 0");

    shuffleArray(trivia);
    loadQuestion();

}

$(document).ready(function () {
    totalQuestion = trivia.length;

    $("<button>", {
        "id" : "start",
        "type": "button",
        "class" : "btn btn-primary btn-lg",
        text: "Start"
    }).appendTo("#score");

    $(document).on("click", ".button", function () {
        if (next) {
            next = false;
            stopTimer ();
            isAnswerCorrect = this.id;
            checkAnswer();
        }
    });

    $(document).on("click", "#start", function () {
        startGame ();
    });
});