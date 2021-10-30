// GLOBAL CONSTANTS
const buttonGroup = document.querySelector('.buttons')
const opButtons = document.querySelector('.operators-numbers')
const inputField = document.querySelector('.display > .input')
const outputField = document.querySelector('.display > .output');
const opList = '+-*/';

// GLOBAL VARIABLES
let currentOperator;
let multiplier = 0;
let currVal = 0;
let lastVal = 0;

// FUNCTIONS
// generates the required buttons
function generateButtonsOperators() {
  let k = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      let newButton = document.createElement('button');
      if (j === 3) {
        newButton.classList.add('operator');
        newButton.textContent = opList[Math.floor(k / 3) - 1];
      } else {
        newButton.classList.add('digit');
        newButton.textContent = (k++);
      }
      opButtons.appendChild(newButton);
    }
  }
  let finalButton = document.createElement('button');
  finalButton.textContent = '.';
  finalButton.classList.add('decimal');
  opButtons.appendChild(finalButton);

  let anotherButton = document.createElement('button');
  anotherButton.textContent = 0;
  anotherButton.classList.add('digit')
  opButtons.appendChild(anotherButton);

  let equalButton = document.createElement('button');
  equalButton.classList.add('equal');
  equalButton.textContent = '=';
  opButtons.appendChild(equalButton);

  let division = document.createElement('button');
  division.classList.add('operator');
  division.textContent = '/';
  opButtons.appendChild(division);

  linkButtonsDigits();
  linkButtonsOperators();
  linkEqualButton();
  return;
}

function linkButtonsDigits() {
  const buttonList = [...opButtons.children];
  for (let i in buttonList) {
    let button = buttonList[i];
    let tempList = [...button.classList]
    if (tempList.indexOf('digit') != -1) {
      button.addEventListener('click', (e) => {
        currVal += parseInt(e.target.textContent) * 10 ** (multiplier++);
        inputField.textContent = currVal;
      })
    }
  }
}

function linkButtonsOperators() {
  const buttonList = [...opButtons.children];
  for (let i in buttonList) {
    let button = buttonList[i];
    let tempList = [...button.classList]
    if (tempList.indexOf('operator') != -1) {
      button.addEventListener('click', (e) => {
        inputField.textContent = `${currVal} ${e.target.textContent}`;
        lastVal = currVal;
        currVal = 0;
        multiplier = 0;
        currentOperator = e.target.textContent;
      })
    }
  }
}

function linkEqualButton() {
  const equalButton = document.querySelector('.equal');
  equalButton.addEventListener('click', e => {
    operate(lastVal, currVal, currentOperator);
  })
}

function updateDisplayOutput(num) {
  outputField.textContent = num;
}

function operate(a, b, op) {
  switch (op) {
    case '+':
      updateDisplayOutput(a + b);
      currVal = a + b;
      break;
    case '-':
      updateDisplayOutput(a - b);
      currVal = a - b;
      break;
    case '*':
      updateDisplayOutput(a * b);
      currVal = a * b;
      break;
    default:
      updateDisplayOutput(a / b);
      currVal = a / b;
  }
}

// INITIALIZERS
window.addEventListener('DOMContentLoaded', generateButtonsOperators);
window.addEventListener('DOMContentLoaded', updateDisplayOutput(0));
