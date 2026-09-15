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

const startScreen = document.getElementById("start-screen");
const triviaScreen = document.getElementById("trivia-screen");
const editScreen = document.getElementById("edit-screen");

const startQuizButton = document.getElementById("start-quiz-button");
const editQuestionsButton = document.getElementById("edit-questions-button");
const triviaHomeButton = document.getElementById("trivia-home-button");
const editHomeButton = document.getElementById("edit-home-button");

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
    showScreen(triviaScreen);
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