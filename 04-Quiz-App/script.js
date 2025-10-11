// script.js

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false },
        ]
    },
    {
        question: "What is the currency of the USA?",
        answers: [
            { text: "Rupee", correct: false },
            { text: "Pound", correct: false },
            { text: "Yen", correct: false },
            { text: "Dollar", correct: true }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctic Polar Desert", correct: true } // Corrected answer text for clarity
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false }
        ]
    },
];

const questionElement = document.getElementById("Question");
// FIX 1: Renamed variable to 'answerButtons' for consistency.
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        // Use the consistent variable name 'answerButtons'
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    // Use the consistent variable name 'answerButtons'
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Use the consistent variable name 'answerButtons'
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
   if(currentQuestionIndex < questions.length) {
    handleNextButton();
   } else {
    startQuiz();
   }
});

// FIX 2: Added this line to start the quiz when the script loads.
startQuiz();