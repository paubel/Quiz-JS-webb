"use strict";

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const correctButtonElement = document.querySelector(".btn");

let shuffledQuestions, currentQuestionIndex;
let items;
let numberOfCorrectAnswers = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  numberOfCorrectAnswers = 0;
  scoreElement.innerText = `Score: ${numberOfCorrectAnswers} `;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${
    shuffledQuestions.length
  }`;

  shuffleArray(question.answers).forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
      console.log(button.dataset.correct, answer.correct);
      console.log(numberOfCorrectAnswers);
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    numberOfCorrectAnswers++;
  }
  console.log("correct: " + correct);
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "End of Quiz - Do you want to restart?";
    startButton.style.fontSize = "2rem";
    //HERE

    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);

  if (correct) {
    element.classList.add("correct");
    scoreElement.innerText = `Score: ${numberOfCorrectAnswers} `;
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "När skapades WWW",
    answers: [
      { text: "Början av 90-talet", correct: false },
      { text: "Slutet av 90-talet", correct: false },
      { text: "Slutet av 80-talet", correct: true },
    ],
  },
  {
    question: "Vad heter den första grafiska webbläsaren?",
    answers: [
      { text: "Netscape", correct: false },
      { text: " Mosaic", correct: true },
      { text: " Internet Explorer", correct: false },
    ],
  },
  {
    question: "Vilket av följande var INTE ett problem med XHTML?",
    answers: [
      { text: "JavaScript funkar inte", correct: false },
      { text: "Man kunde på Yellow screen of death", correct: false },
      { text: "Det var långsammare", correct: true },
    ],
  },
  {
    question: "Varför tog man fram CSS?",
    answers: [
      { text: "För att skilja design från innehåll", correct: true },
      { text: " För att webbläsarna blev snabbare", correct: false },
      { text: "W3C krävde det av webbläsartillverkarna", correct: false },
    ],
  },
  {
    question: "Vad kan du inte göra med Webben idag i Sverige?",
    answers: [
      { text: "Köpa böcker", correct: false },
      { text: "Ta fram sin sjukhusjournaler", correct: false },
      { text: " Rösta i val", correct: true },
    ],
  },
  {
    question: "Vad gör DNS?",
    answers: [
      { text: "Översätter IP-adresser till dommännamn", correct: true },
      { text: "Översätter IP-adresser till HTML", correct: false },
      { text: "Översätter IP-adresser till CSS", correct: false },
      { text: " Översätter IP-adresser till WWW", correct: false },
    ],
  },
  {
    question: "Varför använder man URL?",
    answers: [
      { text: "Det är lättare att komma ihåg text än siffror", correct: true },
      { text: "Det är snabbare", correct: false },
      { text: "Det är säkrare", correct: false },
      { text: "Det är lättare att komma ihåg siffror än text", correct: false },
    ],
  },
  {
    question: "Exempel på extern länk",
    answers: [
      { text: '<a href="https://paubel.se/"> Länk </a>', correct: true },
      { text: '<a href=mapp/index.html"> Länk </a>', correct: false },
      { text: '<link href="http://paubel.se/"> Länk </a>', correct: false },
      { text: '<link href="/mapp/index.html"> Länk </link>', correct: false },
    ],
  },
  {
    question: "Hur bör externa länkar öppnas?",
    answers: [
      { text: "i en ny flik i samma webbläsarfönster", correct: true },
      { text: "i samma flik som som du är i", correct: false },
      { text: " i ett nytt webbläsarfönster", correct: false },
    ],
  },
  {
    question:
      "Vad är ett webbpubliceringssystem, CMS (Content Management System)",
    answers: [
      {
        text: "programvara som hjälper användare att skapa, hantera och ändra innehåll på en webbplats utan behov av specialiserad teknisk kunskap",
        correct: true,
      },
      {
        text: "programvara som hjälper användare att koda, hantera och ändra innehåll på en webbplats med  HTML, CSS och JavaScript",
        correct: false,
      },
      {
        text: "programvara som hjälper användare att hantera olika versioner av din webbplats",
        correct: false,
      },
      {
        text: "En plats där du skickar dina filer till för att de ska gå att se på webben",
        correct: false,
      },
    ],
  },
  {
    question: "Vad kan du inte göra med FTP?",
    answers: [
      { text: "skicka filer till och från Internet", correct: false },
      { text: "skicka filer till och från ett webbhotell", correct: false },
      { text: "Göra webbsidor", correct: true },
    ],
  },
  {
    question: "Vad är Git?",
    answers: [
      { text: "Versionshanteringssystem", correct: true },
      {
        text: "Säkerhetskopiering (kan användas som detta också men är inte syftet)",
        correct: false,
      },
      { text: "Webbhotellssystem", correct: false },
    ],
  },
];
