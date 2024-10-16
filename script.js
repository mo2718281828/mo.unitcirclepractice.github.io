const points = [
  { degree: '0^\\circ \\text{ or } 360^\\circ', radian: '0 \\text{ or } 2\\pi', coord: '(1, 0)', x: 1, y: 0 },
  { degree: '30^\\circ', radian: '\\frac{\\pi}{6}', coord: '(\\frac{\\sqrt{3}}{2}, \\frac{1}{2})', x: Math.sqrt(3) / 2, y: 1 / 2 },
  { degree: '45^\\circ', radian: '\\frac{\\pi}{4}', coord: '(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})', x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { degree: '60^\\circ', radian: '\\frac{\\pi}{3}', coord: '(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})', x: 1 / 2, y: Math.sqrt(3) / 2 },
  { degree: '90^\\circ', radian: '\\frac{\\pi}{2}', coord: '(0, 1)', x: 0, y: 1 },
  { degree: '120^\\circ', radian: '\\frac{2\\pi}{3}', coord: '(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2})', x: -1 / 2, y: Math.sqrt(3) / 2 },
  { degree: '135^\\circ', radian: '\\frac{3\\pi}{4}', coord: '(-\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})', x: -Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { degree: '150^\\circ', radian: '\\frac{5\\pi}{6}', coord: '(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2})', x: -Math.sqrt(3) / 2, y: 1 / 2 },
  { degree: '180^\\circ', radian: '\\pi', coord: '(-1, 0)', x: -1, y: 0 },
  { degree: '210^\\circ', radian: '\\frac{7\\pi}{6}', coord: '(-\\frac{\\sqrt{3}}{2}, -\\frac{1}{2})', x: -Math.sqrt(3) / 2, y: -1 / 2 },
  { degree: '225^\\circ', radian: '\\frac{5\\pi}{4}', coord: '(-\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2})', x: -Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { degree: '240^\\circ', radian: '\\frac{4\\pi}{3}', coord: '(-\\frac{1}{2}, -\\frac{\\sqrt{3}}{2})', x: -1 / 2, y: -Math.sqrt(3) / 2 },
  { degree: '270^\\circ', radian: '\\frac{3\\pi}{2}', coord: '(0, -1)', x: 0, y: -1 },
  { degree: '300^\\circ', radian: '\\frac{5\\pi}{3}', coord: '(\\frac{1}{2}, -\\frac{\\sqrt{3}}{2})', x: 1 / 2, y: -Math.sqrt(3) / 2 },
  { degree: '315^\\circ', radian: '\\frac{7\\pi}{4}', coord: '(\\frac{\\sqrt{2}}{2}, -\\frac{\\sqrt{2}}{2})', x: Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { degree: '330^\\circ', radian: '\\frac{11\\pi}{6}', coord: '(\\frac{\\sqrt{3}}{2}, -\\frac{1}{2})', x: Math.sqrt(3) / 2, y: -1 / 2 }
];

let score = 0;
let previousPoint = null;
let answered = false;

const canvas = document.getElementById('unitCircle');
const ctx = canvas.getContext('2d');

function drawUnitCircle(point) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the black circle
  ctx.beginPath();
  ctx.arc(150, 150, 120, 0, Math.PI * 2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw the black x and y axes
  ctx.beginPath();
  ctx.moveTo(150, 30);
  ctx.lineTo(150, 270);  // y-axis
  ctx.moveTo(30, 150);
  ctx.lineTo(270, 150);  // x-axis
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw the black dashed lines for multiples of pi/6 and pi/4
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
    drawDashedLine(angle);
  }
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
    drawDashedLine(angle);
  }

  // Draw the red vector from the center to the point
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(150 + point.x * 120, 150 - point.y * 120);
  ctx.strokeStyle = 'red';
  ctx.stroke();

  // Draw the red point (larger size)
  ctx.beginPath();
  ctx.arc(150 + point.x * 120, 150 - point.y * 120, 8, 0, Math.PI * 2);  // Larger radius for red point
  ctx.fillStyle = 'red';
  ctx.fill();
}

function drawDashedLine(angle) {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(150, 150);
  ctx.lineTo(150 + x * 120, 150 - y * 120);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.setLineDash([]);
}

function setupQuestion() {
  let currentPoint;
  do {
    currentPoint = points[Math.floor(Math.random() * points.length)];
  } while (currentPoint === previousPoint);

  previousPoint = currentPoint;
  answered = false;

  document.getElementById('nextQuestionBtn').style.display = 'none';
  drawUnitCircle(currentPoint);

  const questionTypes = ['degree', 'radian', 'coord'];
  const questionType = questionTypes[Math.floor(Math.random() * 3)];

  switch (questionType) {
    case 'degree':
      document.getElementById('questionText').textContent = 'What is the degree for this point?';
      generateOptions('degree', currentPoint);
      break;
    case 'radian':
      document.getElementById('questionText').textContent = 'What is the radian for this point?';
      generateOptions('radian', currentPoint);
      break;
    case 'coord':
      document.getElementById('questionText').textContent = 'What are the coordinates for this point?';
      generateOptions('coord', currentPoint);
      break;
  }
}

function generateOptions(type, currentPoint) {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  const options = [];
  const incorrectPoints = points.filter(p => p !== currentPoint).slice(0, 8);  // 8 incorrect options

  incorrectPoints.forEach(p => {
    if (type === 'degree') options.push(p.degree);
    if (type === 'radian') options.push(p.radian);
    if (type === 'coord') options.push(p.coord);
  });

  let correctAnswer;
  if (type === 'degree') correctAnswer = currentPoint.degree;
  if (type === 'radian') correctAnswer = currentPoint.radian;
  if (type === 'coord') correctAnswer = currentPoint.coord;

  options.push(correctAnswer);
  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const button = document.createElement('button');
    button.innerHTML = `\\(${option}\\)`;
    button.onclick = () => checkAnswer(option, correctAnswer, button);
    optionsContainer.appendChild(button);
  });

  MathJax.typesetPromise();
}

function checkAnswer(selectedOption, correctAnswer, button) {
  if (answered) return; // Prevent multiple answers
  answered = true;

  const scoreSheet = document.querySelector('#scoreSheet tbody');
  const row = document.createElement('tr');
  const answerCell = document.createElement('td');
  const changeCell = document.createElement('td');
  const scoreCell = document.createElement('td');

  answerCell.innerHTML = `\\(${correctAnswer}\\)`;

  if (selectedOption === correctAnswer) {
    score += 20;
    changeCell.textContent = '+20';
    changeCell.className = 'green';
    button.style.backgroundColor = '#4CAF50'; // Correct answer
  } else {
    score = Math.max(0, score - 5);
    changeCell.textContent = '-5';
    changeCell.className = 'red';
    button.style.backgroundColor = 'red'; // Incorrect answer
  }

  scoreCell.textContent = score;
  scoreCell.className = 'score';
  row.appendChild(answerCell);
  row.appendChild(changeCell);
  row.appendChild(scoreCell);
  scoreSheet.appendChild(row);

  // Typeset LaTeX for correct answer
  MathJax.typesetPromise([answerCell]).then(() => console.log('MathJax typeset for the correct answer.'));

  if (scoreSheet.rows.length > 6) scoreSheet.deleteRow(0); // Delete the first row of data if there are more than 6 rows
  document.getElementById('nextQuestionBtn').style.display = 'inline'; // Show "Next Question" button
}

document.getElementById('nextQuestionBtn').addEventListener('click', setupQuestion);

setupQuestion();
