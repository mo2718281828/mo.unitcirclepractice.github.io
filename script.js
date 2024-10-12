const canvas = document.getElementById('unitCircle');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2 - 10; // Smaller circle radius
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let score = 0;
let previousPoint = null;

const points = [
  { radian: '0 or 2π', degree: '0° or 360°', coord: '(1, 0)', x: 1, y: 0 },
  { radian: 'π/6', degree: '30°', coord: '(√3/2, 1/2)', x: Math.sqrt(3) / 2, y: 1 / 2 },
  { radian: 'π/4', degree: '45°', coord: '(√2/2, √2/2)', x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { radian: 'π/3', degree: '60°', coord: '(1/2, √3/2)', x: 1 / 2, y: Math.sqrt(3) / 2 },
  { radian: 'π/2', degree: '90°', coord: '(0, 1)', x: 0, y: 1 },
  { radian: '2π/3', degree: '120°', coord: '(-1/2, √3/2)', x: -1 / 2, y: Math.sqrt(3) / 2 },
  { radian: '3π/4', degree: '135°', coord: '(-√2/2, √2/2)', x: -Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 },
  { radian: '5π/6', degree: '150°', coord: '(-√3/2, 1/2)', x: -Math.sqrt(3) / 2, y: 1 / 2 },
  { radian: 'π', degree: '180°', coord: '(-1, 0)', x: -1, y: 0 },
  { radian: '7π/6', degree: '210°', coord: '(-√3/2, -1/2)', x: -Math.sqrt(3) / 2, y: -1 / 2 },
  { radian: '5π/4', degree: '225°', coord: '(-√2/2, -√2/2)', x: -Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { radian: '4π/3', degree: '240°', coord: '(-1/2, -√3/2)', x: -1 / 2, y: -Math.sqrt(3) / 2 },
  { radian: '3π/2', degree: '270°', coord: '(0, -1)', x: 0, y: -1 },
  { radian: '5π/3', degree: '300°', coord: '(1/2, -√3/2)', x: 1 / 2, y: -Math.sqrt(3) / 2 },
  { radian: '7π/4', degree: '315°', coord: '(√2/2, -√2/2)', x: Math.sqrt(2) / 2, y: -Math.sqrt(2) / 2 },
  { radian: '11π/6', degree: '330°', coord: '(√3/2, -1/2)', x: Math.sqrt(3) / 2, y: -1 / 2 },
];



let currentPoint, questionType;

function drawUnitCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  points.forEach(point => {
    if (!(point.x === 1 || point.x === -1 || point.y === 1 || point.y === -1)) {
      ctx.setLineDash([5, 5]);
      const x = centerX + point.x * radius;
      const y = centerY - point.y * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  });

  const x = centerX + currentPoint.x * radius;
  const y = centerY - currentPoint.y * radius;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 8, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function setupQuestion() {
  let newPoint;
  do {
    newPoint = points[Math.floor(Math.random() * points.length)];
  } while (newPoint === previousPoint);

  currentPoint = newPoint;
  previousPoint = newPoint;

  const questionTypes = ['radian', 'degree', 'coord'];
  questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  document.getElementById('questionText').textContent = `Find the ${questionType} for this point:`;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  generateOptions(questionType).forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });

  drawUnitCircle();
}

function generateOptions(type) {
  const correctAnswer = currentPoint[type];
  let allOptions = points.map(p => p[type]);

  allOptions = allOptions.sort(() => Math.random() - 0.5).slice(0, 7); // Always give 8 options
  if (!allOptions.includes(correctAnswer)) allOptions.push(correctAnswer);
  return allOptions.sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedOption) {
  const correctAnswer = currentPoint[questionType];
  const scoreSheet = document.querySelector('#scoreSheet tbody');
  const row = document.createElement('tr');
  const answerCell = document.createElement('td');
  const changeCell = document.createElement('td');
  const scoreCell = document.createElement('td');

  answerCell.textContent = correctAnswer;
  answerCell.style.width = "60%"; // Wider column for "Correct Answer"
  answerCell.style.fontSize = "12px"; // Smaller font size

  if (selectedOption === correctAnswer) {
    score += 20;
    changeCell.textContent = '+20';
    changeCell.className = 'green';
  } else {
    score = Math.max(0, score - 5);
    changeCell.textContent = '-5';
    changeCell.className = 'red';
  }

  scoreCell.textContent = score;
  scoreCell.className = 'score';
  scoreCell.style
  scoreCell.style.textAlign = "center";

  row.appendChild(answerCell);
  row.appendChild(changeCell);
  row.appendChild(scoreCell);
  scoreSheet.appendChild(row);

  if (scoreSheet.rows.length > 10) {
    scoreSheet.deleteRow(1); // Keep the header, delete the top data row
  }

  setTimeout(setupQuestion, 2000);
}

setupQuestion();

