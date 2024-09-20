let questions = [
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title] {...}",
        "answer_2": "a &gt; title {....}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title{...}",
        "right_answer": 1
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, und &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Welche JavaScript-Funktion ruft einen Funktionsausdruck auf?",
        "answer_1": "execute()",
        "answer_2": "run()",
        "answer_3": "invoke()",
        "answer_4": "call()",
        "right_answer": 4
    },
    {
        "question": "Welcher Bootstrap-Klassenname macht ein Element nur auf großen Bildschirmen sichtbar?",
        "answer_1": "d-lg-block",
        "answer_2": "d-md-none",
        "answer_3": "d-sm-inline",
        "answer_4": "d-xl-visible",
        "right_answer": 1
    },
    {
        "question": "Welches Bootstrap-Klassenpräfix wird für das Rastersystem verwendet?",
        "answer_1": ".container",
        "answer_2": ".grid",
        "answer_3": ".col",
        "answer_4": ".row",
        "right_answer": 3
    },
    {
        "question": "Wie verlinkt man eine externe CSS-Datei in HTML?",
        "answer_1": "&lt;style src='mystyle.css'&gt;",
        "answer_2": "&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;",
        "answer_3": "&lt;link rel='stylesheet' type='text/css' href='mystyle.css'&gt;",
        "answer_4": "&lt;css-link rel='stylesheet' href='mystyle.css'&gt;",
        "right_answer": 3
    },
    {
        "question": "Welches Attribut wird verwendet, um ein Eingabefeld in HTML zu deaktivieren?",
        "answer_1": "readonly",
        "answer_2": "disabled",
        "answer_3": "no-input",
        "answer_4": "inactive",
        "right_answer": 2
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sounds/success.mp3');
let AUDIO_FAIL = new Audio('sounds/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];

    document.getElementById("endScreen").style.display = 'none';
    document.getElementById("questionBody").style.display = 'block';
}

function showEndScreen() {
    document.getElementById("endScreen").style.display = 'block';
    document.getElementById("questionBody").style.display = 'none';
    hideFooterElements();
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').style.display = 'none';
}

function hideFooterElements() {
    document.querySelector('.question-footer').style.display = 'none';
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    let question = questions[currentQuestion];
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/pencil.jpg';
    document.getElementById('header-image').style.display = 'block';
    document.getElementById('questionBody').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';
    document.querySelector('.question-footer').style.display = 'block';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
