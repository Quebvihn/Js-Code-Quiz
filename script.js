let containerQuestionEl = document.getElementById("qs-container");
let containerStartEl = document.getElementById("start-container");
let containerEndEl = document.getElementById("end-container")
let containerScoreEl = document.getElementById("scores")
let formInitials = document.getElementById("initials-form")
let containerHighScoresEl = document.getElementById("high-score-container")
let ViewHighScoreEl = document.getElementById("view-high-scores")
let listHighScoreEl = document.getElementById("high-score-list")
let correctEl = document.getElementById("right")
let wrongEl = document.getElementById("wrong")
let questionEl = document.getElementById("question")
let answerbuttonsEl = document.getElementById("answers")
let timerEl = document.querySelector("#timer");

let btnStartEl = document.querySelector("#start-game");
let btnGoBackEl = document.querySelector("#start-again")
let btnClearScoresEl = document.querySelector("#clear-scores")

let score = 0;
let timeleft;
let gameover
timerEl.innerText = 0;

let HighScores = [];

let arrayShuffledQuestions
let QuestionIndex = 0




let questions = [
    { q: "How can you add a comment in a JavaScript?", 
        a: "1. //This is a comment", 
        choices: [{choice: "1. //This is a comment"}, {choice: "2. 'This is a comment"}, {choice: "3. <!--This is a comment-->"}, {choice: "4. #This is a comment"}]
    },
    { q: "Inside which HTML element do we put the javascript?", 
    a: "3. <script>", 
    choices: [{choice: "1. <h1>"}, {choice: "2. <js>"}, {choice: "3. <script>"}, {choice: "4. <head>"}]
    },
    { q: "In JavaScript, which of the following is a logical operator?", 
    a: "2. &&", 
    choices: [{choice: "1. |"}, {choice: "2. &&"}, {choice: "3. %"}, {choice: "4. /"}]
    },
    { q: "How do you call a function named (myFunction)?", 
    a: "4. myFunction()", 
    choices: [{choice: "1. call myFunction()"}, {choice: "2. Call.myFunction()"}, {choice: "3. call function myFunction"}, {choice: "4. myFunction()"}]
    },
    { q: "What does DOM stand for?", 
          a: "2. Document Object Model", 
          choices: [{choice: "1. Do Overnight Modules"}, {choice: "2. Document Object Model"}, {choice: "3. Divas Obviously Model"}, {choice: "4. Do Oo Mo"}]
    },
    { q: "In JavaScript, which of the following is NOT an assignment operator?", 
          a: "2. ||", 
          choices: [{choice: "1. +="}, {choice: "2. ||"}, {choice: "3. *="}, {choice: "4. ="}]
    },
    ]

let setTime = function () {
    timeleft = 30;

let timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
    }

let startGame = function() {
    containerStartEl.classList.add("hide");
    containerStartEl.classList.remove("show");
    containerQuestionEl.classList.remove("hide");
    containerQuestionEl.classList.add("show");
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
  }

  let setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    let resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
    };

    let displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (let i = 0; i < index.choices.length; i++) {
        let answerbutton = document.createElement("button")
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add("btn")
        answerbutton.classList.add("answerbtn")
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };

    let answerCorrect = function() {
    if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
    };

    let answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }
    let answerCheck = function(event) {
        let selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 7
            }

            else {
              answerWrong()
              score = score - 1;
              timeleft = timeleft - 3;
          };

          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }
    let showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        let scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    } 
    