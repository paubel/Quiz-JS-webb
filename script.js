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
    question: "N??r skapades WWW",
    answers: [
      { text: "B??rjan av 90-talet", correct: false },
      { text: "Slutet av 90-talet", correct: false },
      { text: "Slutet av 80-talet", correct: true },
    ],
  },
  {
    question: "Vad heter den f??rsta popul??ra grafiska webbl??saren?",
    answers: [
      { text: "Netscape", correct: false },
      { text: " Mosaic", correct: true },
      { text: " Internet Explorer", correct: false },
    ],
  },
  {
    question: "Vilket av f??ljande var INTE ett problem med XHTML?",
    answers: [
      { text: "JavaScript funkar inte", correct: false },
      { text: "Man kunde p?? Yellow screen of death", correct: false },
      { text: "Det var l??ngsammare", correct: true },
    ],
  },
  {
    question: "Varf??r tog man fram CSS?",
    answers: [
      { text: "F??r att skilja design fr??n inneh??ll", correct: true },
      { text: " F??r att webbl??sarna blev snabbare", correct: false },
      { text: "W3C kr??vde det av webbl??sartillverkarna", correct: false },
    ],
  },
  {
    question: "Vad kan du inte g??ra med Webben idag i Sverige?",
    answers: [
      { text: "K??pa b??cker", correct: false },
      { text: "Ta fram sin sjukhusjournaler", correct: false },
      { text: " R??sta i val", correct: true },
    ],
  },
  {
    question: "Vad g??r DNS?",
    answers: [
      { text: "??vers??tter IP-adresser till dom??nnamn", correct: true },
      { text: "??vers??tter IP-adresser till HTML", correct: false },
      { text: "??vers??tter IP-adresser till CSS", correct: false },
      { text: " ??vers??tter IP-adresser till JavaScript", correct: false },
    ],
  },
  {
    question: "Varf??r anv??nder man URL?",
    answers: [
      { text: "Det ??r l??ttare att komma ih??g text ??n siffror", correct: true },
      { text: "Det ??r snabbare", correct: false },
      { text: "Det ??r s??krare", correct: false },
      { text: "Det ??r l??ttare att komma ih??g siffror ??n text", correct: false },
    ],
  },
  {
    question: "Exempel p?? extern l??nk",
    answers: [
      { text: '<a href="https://paubel.se/"> L??nk </a>', correct: true },
      { text: '<a href=mapp/index.html"> L??nk </a>', correct: false },
      { text: '<link href="http://paubel.se/"> L??nk </a>', correct: false },
      { text: '<link href="/mapp/index.html"> L??nk </link>', correct: false },
    ],
  },
  {
    question: "Hur b??r externa l??nkar ??ppnas?",
    answers: [
      { text: "i en ny flik i samma webbl??sarf??nster", correct: true },
      { text: "i samma flik som som du ??r i", correct: false },
      { text: " i ett nytt webbl??sarf??nster", correct: false },
    ],
  },
  {
    question:
      "Vad ??r ett webbpubliceringssystem, CMS (Content Management System)",
    answers: [
      {
        text: "Programvara som hj??lper anv??ndare att skapa, hantera och ??ndra inneh??ll p?? en webbplats utan behov av specialiserad teknisk kunskap",
        correct: true,
      },
      {
        text: "Programvara som hj??lper anv??ndare att koda, hantera och ??ndra inneh??ll p?? en webbplats med  HTML, CSS och JavaScript",
        correct: false,
      },
      {
        text: "Programvara som hj??lper anv??ndare att hantera olika versioner av din webbplats",
        correct: false,
      },
      {
        text: "En plats d??r du skickar dina filer till f??r att de ska g?? att se p?? webben",
        correct: false,
      },
    ],
  },
  {
    question: "Vad kan du inte g??ra med FTP?",
    answers: [
      { text: "skicka filer till och fr??n Internet", correct: false },
      { text: "skicka filer till och fr??n ett webbhotell", correct: false },
      { text: "G??ra webbsidor", correct: true },
    ],
  },
  {
    question: "Vad ??r Git?",
    answers: [
      { text: "Versionshanteringssystem", correct: true },
      {
        text: "S??kerhetskopiering (kan anv??ndas som detta ocks?? men ??r inte syftet)",
        correct: false,
      },
      { text: "Webbhotellssystem", correct: false },
    ],
  },
  {
    question: "Vad ??r Figma?",
    answers: [
      {
        text: "En tj??nst d??r du g??r layouten p?? en webbplats innan du kodar den",
        correct: true,
      },
      {
        text: "Ett program d??r du skriver HTML och CSS",
        correct: false,
      },
      { text: "En valideringstj??nst", correct: false },
    ],
  },
  {
    question: "Vad ??r Lighthouse?",
    answers: [
      {
        text: "En tj??nst d??r du g??r layouten p?? en webbplats innan du kodar den",
        correct: false,
      },
      {
        text: "Ett program d??r du skriver HTML och CSS",
        correct: false,
      },
      { text: "En valideringstj??nst", correct: false },
      {
        text: "Automatiserat verktyg f??r att f??rb??ttra prestanda, kvalitet och korrekthet p?? webbplatser.",
        correct: true,
      },
    ],
  },
  {
    question: "Varf??r validerar man HTML och CSS?",
    answers: [
      {
        text: " Sidorna blir snabbare",
        correct: false,
      },
      {
        text: " Sidorna blir framtidss??krade",
        correct: true,
      },
      { text: "Sidorna f??r snyggare layout", correct: false },
    ],
  },
  {
    question: "Vad beh??ver INTE en bra editor st??d f??r",
    answers: [
      {
        text: "UTF-8 (inbyggt i ex: Atom, VS Code. i textformatet)",
        correct: false,
      },
      {
        text: " Syntax highlighting",
        correct: false,
      },
      { text: "radnumrering", correct: false },
      { text: "Stavningskontroll p?? texten", correct: true },
    ],
  },
  {
    question: "Vad ??r teckenkodning (charset)?",
    answers: [
      {
        text: "Ett s??tt att koda tecken",
        correct: true,
      },
      {
        text: "Ett s??tt att koda HTML",
        correct: false,
      },
      { text: "Ett s??tt att koda bilder", correct: false },
      { text: "Ett s??tt att koda CSS", correct: false },
    ],
  },
  {
    question: "Var ska charset s??ttas i koden?",
    answers: [
      {
        text: "direkt efter start-head-taggen",
        correct: true,
      },
      {
        text: "direkt efter start-body-taggen",
        correct: false,
      },
      { text: "direkt efter slut-head-taggen", correct: false },
      { text: "direkt f??re start-body-taggen", correct: false },
    ],
  },
  {
    question: "Hur ska charset utf-8 elementet se ut?",
    answers: [
      {
        text: '<meta charset="utf-8">',
        correct: true,
      },
      {
        text: '<meta="utf-8">',
        correct: false,
      },
      { text: '<charset meta="utf-8">', correct: false },
      { text: '<charset="utf-8">', correct: false },
    ],
  },
  {
    question: "Vilket begrepp har med mobilanpassning att g??ra?",
    answers: [
      {
        text: "port",
        correct: false,
      },
      {
        text: "media queries",
        correct: true,
      },
      { text: "meta charset", correct: false },
      { text: "style", correct: false },
    ],
  },
  {
    question: "Vilket bildformat st??ds INTE av HTML5?",
    answers: [
      {
        text: "gif",
        correct: false,
      },
      {
        text: "png",
        correct: false,
      },
      { text: "jpg", correct: false },
      { text: "psd", correct: true },
      { text: "webp", correct: false },
    ],
  },
  {
    question: "Vilket element anv??nds f??r att b??dda in Google Maps i HTML5?",
    answers: [
      {
        text: "iframe",
        correct: true,
      },
      {
        text: "div",
        correct: false,
      },
      { text: "span", correct: false },
      { text: "section", correct: false },
    ],
  },
  {
    question: "Vad kallas f??rgsystemet som anv??nds p?? sk??rmar?",
    answers: [
      {
        text: "RGB",
        correct: true,
      },
      {
        text: "CMYK",
        correct: false,
      },
      { text: "Alpha", correct: false },
      { text: "Gamma", correct: false },
    ],
  },
  {
    question: "Vad anv??nds alpha v??rdet till? Tex rgba(255, 255, 255, 0.5)?",
    answers: [
      {
        text: "??ndra genomskinlighet",
        correct: true,
      },
      {
        text: "??ndra nyanser",
        correct: false,
      },
      { text: "??ndra ljushet", correct: false },
      { text: "??ndra m??ttnad", correct: false },
    ],
  },
  {
    question: "Vilket alternativ ??r det korrekta? De andra har n??got fel i sig",
    answers: [
      {
        text: " #34G23BF",
        correct: false,
      },
      {
        text: " rgba(123, 20, 211, 0,4)",
        correct: false,
      },
      { text: " rgb(123, 20, 211)", correct: true },
      { text: "gul", correct: false },
    ],
  },
  {
    question: "Hur kommenterar man HTML kod?",
    answers: [
      {
        text: "<!-- kommentar -->",
        correct: true,
      },
      {
        text: " # kommentar",
        correct: false,
      },
      { text: " /* kommentar */", correct: false },
      { text: " // kommentar ", correct: false },
    ],
  },
  {
    question: "Vilket bildformat ??r det som bara kan ha 256 f??rger?",
    answers: [
      {
        text: "GIF",
        correct: true,
      },
      {
        text: "PNG",
        correct: false,
      },
      { text: "JPG", correct: false },
      { text: "PSD ", correct: false },
    ],
  },
  {
    question: "Varf??r ska man f??lja riktlinjer n??r man g??r webbplatser?",
    answers: [
      {
        text: "S?? att alla anv??ndare kan anv??nda webbplatsen p?? b??sta s??tt",
        correct: true,
      },
      {
        text: "S?? att du som webbutvecklare f??r mindre att g??ra",
        correct: false,
      },
      {
        text: " S?? att du som webbutvecklare f??r mer att g??ra",
        correct: false,
      },
      { text: "S?? att du tj??nar mer pengar ", correct: false },
    ],
  },
  {
    question: "Vad anv??nds webbanv??ndaragenter INTE till?",
    answers: [
      {
        text: "Ge olika anv??ndare olika webbsidor",
        correct: false,
      },
      {
        text: "Visa olika inneh??ll till olika anv??ndare",
        correct: false,
      },
      {
        text: "Samla statistik om anv??ndarens webbl??sare",
        correct: false,
      },
      { text: "Kan ge skadlig kod till webbl??saren ", correct: true },
    ],
  },
  {
    question:
      "Vad beskrivs h??r: Skapa webbsidor som kan ses med olika OS, webbl??sare, plattformar",
    answers: [
      {
        text: "Webbinteroperabilitet",
        correct: true,
      },
      {
        text: "Anv??ndaragent",
        correct: false,
      },
      {
        text: "V??xlartill??gg",
        correct: false,
      },
      { text: "Operativsystem", correct: false },
    ],
  },
  {
    question: "Samlingsnamn f??r program man kommer ??t via webbl??sare",
    answers: [
      {
        text: "Webbapplikation",
        correct: true,
      },
      {
        text: "Anv??ndaragent",
        correct: false,
      },
      {
        text: "H??rdvaruplattform",
        correct: false,
      },
      { text: "Operativsystem", correct: false },
    ],
  },
  {
    question: "PC, Mac, Android ??r exempel p?? en:",
    answers: [
      {
        text: "Webbapplikation",
        correct: false,
      },
      {
        text: "Anv??ndaragent",
        correct: false,
      },
      {
        text: "H??rdvaruplattform",
        correct: true,
      },
      { text: "Operativsystem", correct: false },
    ],
  },
  {
    question:
      "Vilket verktyg ??r INTE en tj??nst f??r att kvalitetss??kra webbplatsen?",
    answers: [
      {
        text: "Google mobilv??nlighetstest",
        correct: false,
      },
      {
        text: "W3C validatortj??nst f??r HTML",
        correct: false,
      },
      {
        text: "W3C validatortj??nst f??r CSS",
        correct: false,
      },
      { text: "Google fonts", correct: true },
    ],
  },
  {
    question: "Vilket p??st??ende om l??senord ger INTE h??gre s??kerhet",
    answers: [
      {
        text: " Ha olika l??senord p?? olika tj??nster",
        correct: false,
      },
      {
        text: " Anv??nd l??senordshanterare",
        correct: false,
      },
      {
        text: " Anv??nd ord som ??r kopplade till dig",
        correct: true,
      },
      { text: " Hellre l??nga ??n korta str??ngar (ord)", correct: false },
    ],
  },
  {
    question: "Vad anv??nds JavaScript INTE till?",
    answers: [
      {
        text: "Att ??ndra webbsidans utseende",
        correct: false,
      },
      {
        text: "Att programmera en webbsida",
        correct: false,
      },
      {
        text: "Att validera en webbsida",
        correct: true,
      },
      { text: "Att ??ndra webbsidans inneh??ll ", correct: false },
    ],
  },
];
