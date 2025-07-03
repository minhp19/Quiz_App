const questions = [
    {
        question: "Thuộc tính nào dùng để căn giữa văn bản theo chiều ngang?",
        answers: [
            { text: "text-align: center;", correct: true},
            { text: "margin: auto;", correct: false},
            { text: "align: center;", correct: false},
            { text: "center-text: true;", correct: false},
        ],
            explanation: "`text-align: center;` là thuộc tính đúng để căn giữa văn bản theo chiều ngang trong một phần tử khối."

    },
    {
        question: "Trong CSS, selector nào dưới đây có độ ưu tiên cao nhất?",
        answers: [
            { text: "div.menu", correct: false},
            { text: ".menu", correct: false},
            { text: "#menu", correct: true},
            { text: "nav ul li", correct: false},
        ],
            explanation: "`#menu` là selector ID, có độ ưu tiên cao hơn class (`.menu`) hoặc tag (`div`, `nav`...)."
    },
    {   question: "typeof NaN trả về gì?",
        answers: [
            {text: "NaN", correct: false},
            {text: "Undefined", correct: false},
            {text: "number", correct: true},
            {text: "null", correct: false},
        ],
            explanation: "`typeof NaN` trả về `'number'` vì NaN là một giá trị đặc biệt thuộc kiểu Number trong JavaScript."
    },
        {
        question: " Trong JavaScript, từ khóa this trong một phương thức của object trỏ tới đâu?",
        answers: [
            { text: "Đối tượng window", correct: false},
            { text: "null", correct: false},
            { text: "Hàm gọi nó", correct: false},
            { text: "Chính object", correct: true},
        ],
            explanation: "Khi một phương thức được gọi thông qua object, từ khóa `this` trỏ tới chính object đó."

    },
    {
        question: "Closure trong JavaScript là gì?",
        answers: [
            { text: "Một hàm gọi lại chính nó", correct: false},
            { text: "Hàm có thể ghi nhớ và truy cập biến trong phạm vi cha kể cả khi hàm cha đã kết thúc", correct: true},
            { text: "Một hàm dùng để tối ưu bộ nhớ", correct: false},
            { text: "Một kiểu biến đặc biệt", correct: false},
        ],
            explanation: "Closure giúp một hàm nhớ các biến của hàm cha, ngay cả khi hàm cha đã return rồi."
    },
    {
        question: "Điều gì xảy ra khi bạn áp dụng position: absolute lên một phần tử không có phần tử cha đặt position: relative?",
        answers: [
            { text: "Nó căn theo vị trí của nó", correct: false},
            { text: "Nó sẽ căn theo phần tử cha gần nhất", correct: false},
            { text: "Nó sẽ căn theo thẻ html hoặc body", correct: true},
            { text: "Trình duyệt sẽ báo lỗi", correct: false},
        ],
            explanation: "Nếu không có phần tử cha nào có position relative/absolute/fixed, phần tử sẽ căn theo thẻ `<html>` hoặc `<body>`."

    },

    {   question: "console.log(a); var a = 10;",
        answers: [
            {text: "10", correct: false},
            {text: "Undefined", correct: true},
            {text: "ReferenceError", correct: false},
            {text: "null", correct: false},
        ],
            explanation: "Biến `a` được hoisting lên đầu nhưng chưa được gán → nên in ra `undefined`."
    },
    {   
        question: "console.log([] == ![]);",
        answers: [
            {text: "true", correct: true},
            {text: "false", correct: false},
            {text: "Undefind", correct: false},
            {text: "NaN", correct: false},
        ],
            explanation: "`![]` là `false`, nên `[] == false`. JS ép kiểu `[]` thành `''`, rồi `'' == false` → `0 == 0` → `true`."
    },
    {
        question: "Kết quả đoạn sau là gì?\n\nconst a = Symbol(\"x\");\nconst b = Symbol(\"x\");\nconsole.log(a === b);",
        answers: [
            { text: "true", correct: false },
            { text: "false", correct: true },
            { text: "undefined", correct: false },
            { text: "Lỗi", correct: false },
        ],
            explanation: "Mỗi `Symbol(''x'')` là giá trị **duy nhất**, nên `a !== b` dù có cùng mô tả."
    },
    {
        question: "Kết quả là gì?\n\nfunction change(obj) {\n  obj.key = \"updated\";\n  obj = { key: \"new object\" };\n}\nconst target = { key: \"initial\" };\nchange(target);\nconsole.log(target.key);",
        answers: [
            { text: "updated", correct: true },
            { text: "new object", correct: false },
            { text: "initial", correct: false },
            { text: "undefined", correct: false },
  ],
            explanation: "Tham số `obj` ban đầu trỏ tới `target`, nên `obj.key = 'updated'` thay đổi thật. Nhưng khi `obj = {...}` thì chỉ thay đổi local reference, không ảnh hưởng đến `target` gốc."
}


];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let timeLeft = 15;
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
    document.getElementById("explanation").innerText = "";
}

function selectAnswer(e) {
    resetTimer(); 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score += timeLeft;
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

    const explanationElement = document.getElementById("explanation");
    explanationElement.innerText = questions[currentQuestionIndex].explanation;

}

function showScore() {
    resetTimer(); 
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
    questionElement.innerHTML = `🎉 Bạn được ${score} điểm từ tối đa ${questions.length * 10}`;

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
    timeLeft = 15;
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
    timerElement.style.color = "black";
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