const buttonGroup = document.querySelector('.buttons')
const opButtons = document.querySelector('.operators-numbers')
const opList = '+-*/';

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
  opButtons.appendChild(finalButton);

  let anotherButton = document.createElement('button');
  anotherButton.textContent = 0;
  opButtons.appendChild(anotherButton);

  let equalButton = document.createElement('button');
  equalButton.classList.add('equal');
  equalButton.textContent = '=';
  opButtons.appendChild(equalButton);

  let division = document.createElement('button');
  division.classList.add('operator');
  division.textContent = '/';
  opButtons.appendChild(division);

}

window.addEventListener('DOMContentLoaded', generateButtonsOperators);