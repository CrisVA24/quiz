let questions = [
    {
        question: "¿Qué lenguaje se utiliza principalmente para agregar interactividad a una página web?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: 2
    },
    {
        question: "¿Qué método de JavaScript agrega un elemento al final de un array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        correctAnswer: 0
    },
    {
        question: "¿Qué tecnología se utiliza para definir la estructura de una página web?",
        options: ["CSS", "HTML", "JavaScript", "Git"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál de las siguientes opciones es un sistema de control de versiones?",
        options: ["Git", "Node.js", "CSS", "MySQL"],
        correctAnswer: 0
    },
    {
        question: "¿Qué propiedad del DOM permite obtener un elemento por su identificador?",
        options: [
            "document.querySelectorAll()",
            "document.createElement()",
            "document.getElementById()",
            "document.appendChild()"
        ],
        correctAnswer: 2
    }
];

let currentScreen = "start";
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

const startScreen = document.getElementById("start-screen");
const triviaScreen = document.getElementById("trivia-screen");
const editScreen = document.getElementById("edit-screen");

const startQuizButton = document.getElementById("start-quiz-button");
const editQuestionsButton = document.getElementById("edit-questions-button");
const triviaHomeButton = document.getElementById("trivia-home-button");
const editHomeButton = document.getElementById("edit-home-button");

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    const progress = document.createElement("p");
    
    progress.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = currentQuestion.question;

    const optionsContainer = document.createElement("div");

    currentQuestion.options.forEach(function (option, index) {
        const optionButton = document.createElement("button");

        optionButton.type = "button";
        optionButton.textContent = option;
        optionButton.dataset.optionIndex = index;

        optionButton.addEventListener("click", function () {
            const selectedOptionIndex = Number(optionButton.dataset.optionIndex);

            handleAnswer(selectedOptionIndex, optionsContainer);
        });

        optionsContainer.appendChild(optionButton);
    });

    const triviaContent = document.getElementById("trivia-content");

    triviaContent.replaceChildren(
        progress,
        questionTitle,
        optionsContainer
    );
}

function renderResults() {
    const resultsTitle = document.createElement("h3");
    resultsTitle.textContent = "Resultado final";

    const scoreText = document.createElement("p");
    scoreText.textContent =
        `Obtuviste ${score} de ${questions.length} respuestas correctas.`;

    const restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.textContent = "Volver a intentar";

    restartButton.addEventListener("click", function () {
        currentQuestionIndex = 0;
        userAnswers = [];
        score = 0;

        renderQuestion();
    });

    const triviaContent = document.getElementById("trivia-content");

    triviaContent.replaceChildren(
        resultsTitle,
        scoreText,
        restartButton
    );
}

function handleAnswer(selectedOptionIndex, optionsContainer) {
    const currentQuestion = questions[currentQuestionIndex];

    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;

    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedOptionIndex: selectedOptionIndex,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        score++;
    }

    const optionButtons = optionsContainer.querySelectorAll("button");

    optionButtons.forEach(function (button) {
        button.disabled = true;
    });

    const feedback = document.createElement("p");

    if (isCorrect) {
        feedback.textContent = "¡Correcto!";
    } else {
        const correctOption =
            currentQuestion.options[currentQuestion.correctAnswer];

        feedback.textContent =
            `Incorrecto. La respuesta correcta es: ${correctOption}`;
    }

    const triviaContent = document.getElementById("trivia-content");

    triviaContent.appendChild(feedback);

    if (currentQuestionIndex < questions.length - 1) {
        const nextButton = document.createElement("button");

        nextButton.type = "button";
        nextButton.textContent = "Siguiente pregunta";

        nextButton.addEventListener("click", function () {
            currentQuestionIndex++;
            renderQuestion();
        });

        triviaContent.appendChild(nextButton);
    } else {
        const resultsButton = document.createElement("button");

        resultsButton.type = "button";
        resultsButton.textContent = "Ver resultados";

        resultsButton.addEventListener("click", function () {
            renderResults();
        });

        triviaContent.appendChild(resultsButton);
    }
}

function showScreen(screen) {
    startScreen.classList.add("hidden");
    triviaScreen.classList.add("hidden");
    editScreen.classList.add("hidden");

    screen.classList.remove("hidden");

    if (screen === startScreen) {
        currentScreen = "start";
    } else if (screen === triviaScreen) {
        currentScreen = "trivia";
    } else if (screen === editScreen) {
        currentScreen = "edit";
    }
}

startQuizButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;

    showScreen(triviaScreen);
    renderQuestion();
});

editQuestionsButton.addEventListener("click", function () {
    showScreen(editScreen);
});

triviaHomeButton.addEventListener("click", function () {
    showScreen(startScreen);
});

editHomeButton.addEventListener("click", function () {
    showScreen(startScreen);
});