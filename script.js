// GLOBAL CONSTANTS
const buttonGroup = document.querySelector('.buttons')
const opButtons = document.querySelector('.operators-numbers')
const inputField = document.querySelector('.display > .input')
const outputField = document.querySelector('.display > .output');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const showAbout = document.querySelector('.show-about')
const arrowButton = document.querySelector('.show-about > svg');
const about = document.querySelector('.about')
const info = document.querySelector('.about > .info');
const footerLinks = document.querySelector('.about > .links-copyright');
const opList = '+-*/';

// GLOBAL VARIABLES
let currVal = '';
let ans = null;
let lastOp = null;
let equalCondition = false;
let ifDecimal = false;
let divShowing = false;

// FUNCTIONS
// generates the required buttons
function generateButtonsOperators() {
  let k = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      let newButton = document.createElement('button');
      if (j === 3) {
        newButton.classList.add('operator');
        newButton.setAttribute('type',"button");
        newButton.classList.add(opList[Math.floor(k / 3) - 1]);
        newButton.textContent = opList[Math.floor(k / 3) - 1];
      } else {
        newButton.setAttribute('type',"button");
        newButton.classList.add('digit');
        newButton.classList.add(k);
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
  anotherButton.classList.add('digit');
  anotherButton.classList.add('0');
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
  linkDecimalButton();
  return;
}

function linkButtonsDigits() {
  const buttonList = [...opButtons.children];
  for (let i in buttonList) {
    let button = buttonList[i];
    let tempList = [...button.classList]
    if (tempList.indexOf('digit') != -1) {
      button.addEventListener('click', doDigit)
    }
  }
}

function doDigit(e, key) {
  let digit = (e !== null ? e.target.textContent : key);
  if (e === null) {
    const digitKey = document.getElementsByClassName(key)[0];
    digitKey.classList.toggle('clicked');
  }
  if (equalCondition) {
    currVal = '';
    inputField.textContent = '';
    equalCondition = false;
  }
  currVal += digit;
  outputField.textContent = currVal;
}

function linkButtonsOperators() {
  const buttonList = [...opButtons.children];
  for (let i in buttonList) {
    let button = buttonList[i];
    let tempList = [...button.classList]
    if (tempList.indexOf('operator') != -1) {
      button.addEventListener('click', doOperator)
    }
  }
}

function doOperator(e, operatorPassed) {
  console.log(e);
  console.log(operatorPassed);
  if (currVal === '' && ans === null)
    return;

  equalCondition = false;
  if (currVal === '') {
    inputField.textContent = `${ans} ${e.target.textContent}`;
    lastOp = e.target.textContent;
    return;
  }
  let operator;
  if (e === null) {
    operator = operatorPassed;
    const digitKey = document.getElementsByClassName(operatorPassed)[0];
    digitKey.classList.toggle('clicked');
  } else {
    operator = e.target.textContent;
  }
  if(e.key === "Enter"){
    return;
  }

  if (lastOp !== null) {
    operate(Number(ans), Number(currVal), lastOp);
    lastOp = operator;
    inputField.textContent = `${ans} ${lastOp}`;
    outputField.textContent = '';
    currVal = '';
    return;
  }

  lastOp = operator;
  ans = Number(currVal);
  currVal = '';
  inputField.textContent = `${ans} ${operator}`;
  outputField.textContent = `${ans}`;
}

function linkEqualButton() {
  const equalButton = document.querySelector('.equal');
  equalButton.addEventListener('click', doEqual)
}

function doEqual() {
  if (ans === null || currVal === '') return;
  inputField.textContent = `${ans} ${lastOp} ${currVal}`;
  operate(Number(ans), Number(currVal), lastOp);
  currVal = String(ans);
  ans = null;
  lastOp = null;
  equalCondition = true;
}

function updateDisplayOutput(num) {
  outputField.textContent = num;
}

function operate(a, b, op) {
  switch (op) {
    case '+':
      ans = a + b;
      break;
    case '-':
      ans = a - b;
      break;
    case '*':
      ans = a * b;
      break;
    default:
      ans = a / b;
  }
  if (ans === Infinity) {
    alert("Zero Division Error");
    return;
  }
  updateDisplayOutput(ans);
}

function deleteFromExpression(e) {
  if (currVal === "") {
    equalCondition = false;
    return;
  }
  if (currVal[currVal.length - 1] === '.') {
    ifDecimal = false;
  }
  currVal = currVal.slice(0, currVal.length - 1);
  outputField.textContent = outputField.textContent.slice(0, outputField.textContent.length - 1);
  equalCondition = false;
}

function clearCalculator(e) {
  inputField.textContent = '';
  outputField.textContent = '';
  lastOp = null;
  currVal = '';
  ans = null;
  equalCondition = false;
}

function linkDecimalButton(e) {
  const decimalButton = document.querySelector('.decimal');
  decimalButton.addEventListener('click', e => {
    if (ifDecimal || equalCondition) {
      return;
    }
    currVal += e.target.textContent;
    outputField.textContent = currVal;
    ifDecimal = true;
    return;
  })
}

function showAboutDiv(e) {
  if (divShowing === false) {
    footerLinks.classList.toggle('slide-in');
    info.classList.toggle('slide-in')
    arrowButton.classList.add('clicked-arrow');
    about.classList.toggle("hidden");
    divShowing = true;
  } else {
    footerLinks.classList.toggle('slide-in');
    info.classList.toggle('slide-in');
    divShowing = false;
    arrowButton.classList.remove('moving-arrow');
    arrowButton.classList.remove('clicked-arrow');
    about.classList.toggle("hidden");
  }

}

function addRequiredListeners(button) {
  button.addEventListener('click', (e) => {
    e.target.classList.add('clicked');
  })
  button.addEventListener('transitionend', (e) => {
    if (e.propertyName !== "transform") {
      return;
    }
    e.target.classList.remove('clicked');
  })
}

function setAnimations() {
  const operatorButtons = [...opButtons.children];
  for (let i = 0; i < operatorButtons.length; i++) {
    addRequiredListeners(operatorButtons[i]);
  }
  addRequiredListeners(clearButton);
  addRequiredListeners(deleteButton);
}

function moveArrow(e) {
  arrowButton.classList.add('moving-arrow');
}

function restoreArrow(e) {
  arrowButton.classList.remove('moving-arrow');
}

function keyPress(e) {
  if (e.key >= 0 && e.key <= 9) {
    doDigit(null, e.key);
  } else if (opList.indexOf(e.key) != -1) {
    doOperator(null, e.key);
  } else if (e.key === '=' || e.key === 'Enter') {
    doEqual();
  } else if (e.key === "Backspace") {
    deleteFromExpression();
  }
}

// INITIALIZERS
window.addEventListener('DOMContentLoaded', generateButtonsOperators);
window.addEventListener('DOMContentLoaded', setAnimations);
window.addEventListener('keydown', keyPress);
deleteButton.addEventListener('click', deleteFromExpression);
clearButton.addEventListener('click', clearCalculator);
showAbout.addEventListener('click', showAboutDiv);
showAbout.addEventListener('mouseenter', moveArrow);
showAbout.addEventListener('mouseleave', restoreArrow);