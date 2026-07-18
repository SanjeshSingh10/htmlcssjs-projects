//dom elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//quiz state VARS 

let currentQuestionIndex = 0;
let score = 0;  
let answerDisabled = false;
 
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
 
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);




function startQuiz() {
    currentQuestionIndex = 0;
    score =0 ;
    scoreSpan.textContent = score;


    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent= ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;
    
    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach( (answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text ;
        button.classList.add("answer-btn");
        
        button.dataset.correct = answer.correct ;
        button.addEventListener("click", selectAnswer);
        answerContainer.appendChild(button);
    })
}

function selectAnswer(event) {  
    if (answerDisabled) return; 

    answerDisabled = true;
    const slectedbutton = event.target;
    const isCorrect = slectedbutton.dataset.correct === "true";

// here Array.from() is used to convert the nodelist returned by answerContainer.children into an array , this is because nodelist  is not an array and does not have the forEach method, so we use Array.from() to convert it into an array so that we can use the forEach method to iterate over the buttons and add the correct or wrong class to them based on whether they are correct or not.

    Array.from(answerContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if( button === slectedbutton && !isCorrect){
            button.classList.add("wrong");
        }

    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {  
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    },500)
}
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreSpan.textContent = score;
   
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) {
        resultMessage.textContent = "Excellent work!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good job!";
    } else {
        resultMessage.textContent = "Better luck next time!";
    }
     
}
function restartQuiz() {
    resultScreen.classList.remove('active');
   startQuiz();
   
}