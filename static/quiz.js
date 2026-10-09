// ======================================================
// QUESTIONS
// ======================================================
const questions = [
  {
    question: "Who is the NBA's all-time leading scorer in regular season history?",
    choices: ["Kareem Abdul-Jabbar", "LeBron James", "Michael Jordan", "Kobe Bryant"],
    answer: 1,
    explanation: "LeBron James surpassed Kareem Abdul-Jabbar to become the NBA's all-time leading scorer."
  },
  {
    question: "Which player has won the most NBA championship rings as a player?",
    choices: ["Michael Jordan", "Kobe Bryant", "Bill Russell", "Robert Horry"],
    answer: 2,
    explanation: "Bill Russell won 11 NBA championships during his 13-year career with the Boston Celtics."
  },
  {
    question: "Which NBA team has won the most overall championships in league history?",
    choices: ["Los Angeles Lakers", "Boston Celtics", "Golden State Warriors", "Chicago Bulls"],
    answer: 1,
    explanation: "The Boston Celtics hold the record for the most total NBA championships."
  },
  {
    question: "Who holds the record for scoring the most points in a single NBA game (100 points)?",
    choices: ["Wilt Chamberlain", "Kobe Bryant", "Devin Booker", "Michael Jordan"],
    answer: 0,
    explanation: "Wilt Chamberlain scored 100 points in a single game on March 2, 1962."
  },
  {
    question: "Which player is pictured in the official NBA logo silhouette?",
    choices: ["Magic Johnson", "Jerry West", "Larry Bird", "Michael Jordan"],
    answer: 1,
    explanation: "The iconic NBA logo is modeled after Hall of Famer Jerry West."
  },
  {
    question: "How many championships did Michael Jordan win with the Chicago Bulls?",
    choices: ["4", "5", "6", "7"],
    answer: 2,
    explanation: "Michael Jordan led the Chicago Bulls to 6 NBA championships across two separate three-peats."
  },
  {
    question: "Which player earned the nickname 'The Greek Freak'?",
    choices: ["Luka Dončić", "Giannis Antetokounmpo", "Nikola Jokić", "Kristaps Porziņģis"],
    answer: 1,
    explanation: "Giannis Antetokounmpo is known as 'The Greek Freak' due to his athleticism and heritage."
  },
  {
    question: "Which team completed a historic 3-1 series comeback in the 2016 NBA Finals?",
    choices: ["Miami Heat", "Golden State Warriors", "Cleveland Cavaliers", "Toronto Raptors"],
    answer: 2,
    explanation: "The Cleveland Cavaliers came back from a 3-1 deficit to defeat the Warriors in 2016."
  },
  {
    question: "Who holds the record for the most 3-pointers made in NBA history?",
    choices: ["Ray Allen", "Stephen Curry", "Reggie Miller", "James Harden"],
    answer: 1,
    explanation: "Stephen Curry holds the all-time record for the most 3-pointers made."
  },
  {
    question: "Which franchise won the very first NBA championship in 1947 (as the BAA)?",
    choices: ["Philadelphia Warriors", "New York Knicks", "Boston Celtics", "Minneapolis Lakers"],
    answer: 0,
    explanation: "The Philadelphia Warriors won the inaugural 1947 league championship."
  }
];

// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function goPrevious() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}

function goLast() {
  currentQuestion = questions.length - 1;
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  if (questions.length === 0) return 0;
  return Math.round((score / questions.length) * 100);
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  if (percentage >= 80) return "Excellent";
  if (percentage >= 60) return "Good";
  if (percentage >= 50) return "Pass";
  return "Needs improvement";
}

// ======================================================
// BUILD CORRECTION
// ======================================================
function buildCorrection() {
  let correction = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const userChoiceIdx = userAnswers[i];
    const userAnsText = userChoiceIdx !== undefined ? q.choices[userChoiceIdx] : "Not answered";
    const correctAnsText = q.choices[q.answer];
    const isCorrect = userChoiceIdx === q.answer;

    correction += `Question ${i + 1}: ${q.question}\n`;
    correction += `Your answer: ${userAnsText}\n`;
    correction += `Correct answer: ${correctAnsText}\n`;
    correction += `Result: ${isCorrect ? "Correct" : "Incorrect"}\n`;
    correction += `Explanation: ${q.explanation}\n`;
    correction += `--------------------------------------------------\n\n`;
  }

  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();