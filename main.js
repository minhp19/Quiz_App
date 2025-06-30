const questions = [
    {
        question: "Điều gì xảy ra khi bạn áp dụng position: absolute lên một phần tử không có phần tử cha đặt position: relative?",
        answers: [
            { text: "Nó căn theo vị trí của nó", correct: false},
            { text: "Nó sẽ căn theo phần tử cha gần nhất", correct: false},
            { text: "Nó sẽ căn theo thẻ <html> hoặc <body>", correct: true},
            { text: "Trình duyệt sẽ báo lỗi", corect: false},
        ]
    },
    {
        question: "Thuộc tính nào dùng để căn giữa văn bản theo chiều ngang?",
        answers: [
            { text: "text-align: center;", correct: true},
            { text: "margin: auto;", correct: false},
            { text: "align: center;", correct: false},
            { text: "center-text: true;", correct: false},
        ]
    },
    {
        question: "Closure trong JavaScript là gì?",
        answers: [
            { text: "Một hàm gọi lại chính nó", correct: false},
            { text: "Hàm có thể ghi nhớ và truy cập biến trong phạm vi cha kể cả khi hàm cha đã kết thúc", correct: true},
            { text: "Một hàm dùng để tối ưu bộ nhớ", correct: false},
            { text: "Một kiểu biến đặc biệt", correct: false},
        ]
    },
    {
        question: "Trong CSS, selector nào dưới đây có độ ưu tiên cao nhất?",
        answers: [
            { text: "div.menu", correct: false},
            { text: ".menu", correct: false},
            { text: "#menu", correct: true},
            { text: "nav ul li", correct: false},
        ]
    },
    {
        question: " Trong JavaScript, từ khóa this trong một phương thức của object trỏ tới đâu?",
        answers: [
            { text: "Đối tượng window", correct: false},
            { text: "null", correct: false},
            { text: "Hàm gọi nó", correct: false},
            { text: "Chính object", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let timeLeft = 10;
let countdownInterval;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0
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
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
    startTimer();
}

function resetState() {
     resetTimer(); 
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    resetTimer(); 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from (answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetTimer(); 
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
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

// Them phan dem 
function startTimer () {
    timeLeft = 10;
    timerElement.innerHTML = `⏱ ${timeLeft}`;
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `⏱ ${timeLeft}`;
        
        if (timeLeft <= 3) {
            timerElement.style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            autoMoveToNext();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdownInterval);
    timerElement.innerHTML = "";
}

function autoMoveToNext() {
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}




startQuiz();