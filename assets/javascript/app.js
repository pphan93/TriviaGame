var currentAnswer;
var isAnswerCorrect;
var nextQuestion = 0;
var totalQuestion;
var correct = 0;
var incorrect = 0;

var trivia = {
    questions: ["Where did Harry Potter go to school?",
        "What is Darth Vader's real name?"
        //"Who sang the theme song from Titanic?",
        //"How do Anna and Elsa know each other in Frozen?",
        //"Who was the main villain in Avengers: Infinity War?",
        //"Who directed Inception?",
        //"What island is Jurassic Park on?",
        //"What volcano does Frodo Baggins toss the One Ring into?",
        //"What planet did Luke Skywalker grow up on?",
        //"What fictional African nation is Black Panther from?"
    ],
    answerOptions: [
        ["Hogwarts", "Neverland", "Mordor", "Dreamland"],
        ["Anakin Skywalker", "Nat Skywalker", "Cade Skywalker", "Ben Skywalker"]
    ],
    //online    : true,
    correctAnswer: function (position) {
        return this.answerOptions[position][0];
    }
};

var triviaTest = [{
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


console.log(trivia.correctAnswer(0));

//console.log (shuffleArray(trivia.answerOptions[0]))


function loadQuestion() {

    clearScreen();
    questionCounter();

    $("<h2/>", {
        text: triviaTest[nextQuestion].question
    }).appendTo("#loadQuestion");

    currentAnswer = triviaTest[nextQuestion].answer.split(" ").join("");

    var temparray = triviaTest[nextQuestion].answerOptions.slice(0);
    console.log(temparray);
    temparray = shuffleArray(temparray);
    console.log(temparray);
    for (var i = 0; i < temparray.length; i++) {
        $("<button/>", {
            "class": "button",
            "id": temparray[i].split(" ").join(""),
            html: temparray[i],
        }).appendTo("#answerOptions");
    }

    console.log("test");
}

function checkAnswer() {
    if (nextQuestion + 1 < totalQuestion) {
        if (currentAnswer === isAnswerCorrect) {
            console.log("answer Correct");
            loadImage ();
            nextQuestion++;
            correct = correct + 1;
            correctAnswered(correct);
            callLoadQuestion();

        } else {
            console.log("answer incorrect");
            loadImage ();
            nextQuestion++;
            incorrect = incorrect + 1;
            incorrectAnswered(incorrect);
            callLoadQuestion();

        }
    } else if (nextQuestion + 1 === totalQuestion) {
        if (currentAnswer === isAnswerCorrect) {
            correctAnswered(correct++);
            console.log("answer Correct : End GAME");

        } else {
            incorrectAnswered(incorrect++);
            console.log("answer incorrect : End GAME");
        }
    }
}

function clearScreen() {
    $(".clear").empty();

}

function callLoadQuestion () {
    setTimeout(
        function () {
            loadQuestion();
        }, 3000
    );
}

function loadImage () {
    $("<img/>", {
        "class": "img-fluid",
        src: triviaTest[nextQuestion].picture
    }).appendTo("#image");
}

function questionCounter() {
    $("#totalQuestion").text((nextQuestion + 1) + "/" + totalQuestion);
}

function correctAnswered(correct) {
    var correctInput = $("#" + isAnswerCorrect);
    correctInput.addClass("correct");
    correctInput.html("&#10003; " + correctInput.text());
    console.log("correctAASAS: " + correct);
    $("#correctAnswered").text("Correct: " + correct);
}

function incorrectAnswered(incorrect) {
    var incorrectInput = $("#" + isAnswerCorrect);
    var correct = $("#" + currentAnswer);


    correct.addClass("correct");
    correct.html("&#10003; " + correct.text());
    console.log("incoorectAASAS: " + incorrect);
    //$("#correctAnswered").text("Correct: " + incorrect);

    incorrectInput.addClass("incorrect");
    incorrectInput.html("&#10007; " + incorrectInput.text());
}


//temparray = trivia.answerOptions[0].slice(0);
//console.log(temparray);
//temparray = shuffle(temparray);
//shuffleArray(temparray);
//console.log(temparray);
//console.log (temparr);

//console.log (trivia.answerOptions[0]);
console.log(triviaTest[0].answer);


$(document).ready(function () {
    totalQuestion = triviaTest.length;
    shuffleArray(triviaTest);
    loadQuestion();

    $(document).on("click", ".button", function () {
        isAnswerCorrect = this.id;
        console.log(isAnswerCorrect);
        checkAnswer();
    });
});