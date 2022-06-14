function add(firstNumber, secondNumber){
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber){
    return firstNumber / secondNumber;
}

function operate(a, b, operator){
    switch (operator) {
        case '+':
            return add(a, b);
            break;

        case '-':
            return subtract(a, b);
            break;

        case '*':
            return multiply(a, b);
            break;

        case '/':
            return divide(a, b);
            break;
    }
}

const display = document.querySelector('#display');
const displayOperation = document.querySelector('#operation');
const displayResult = document.querySelector('#result');
const buttons = document.querySelectorAll('.button');
let firstNumber = 0;
let operator;
let secondNumber = 0;

buttons.forEach(button => 
{
    if(button.textContent !== 'Clear' && button.textContent !== 'Delete')
        button.addEventListener('click', displayNumbers);
})

function displayNumbers(e){
    let buttonClicked = e.target.textContent;
    let numbersRegex = new RegExp ("^([0-9])$");

    if(operator === undefined){
        if(numbersRegex.test(buttonClicked)){   
            firstNumber += buttonClicked;
            display.textContent += buttonClicked;
        }
        else {
            if(buttonClicked !== '=' && firstNumber !== 0){
                operator = buttonClicked;
                display.textContent += `   ${buttonClicked}   `;   
            }
        }
    }
    else {
        if(numbersRegex.test(buttonClicked)){   
            secondNumber += buttonClicked;
            display.textContent += buttonClicked; 
        }
    }

    if(buttonClicked === '='){
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);

        console.log(firstNumber);
        console.log(secondNumber);

        display.textContent = operate(firstNumber, secondNumber, operator);

        // RESET ALL VARIABLES;
        firstNumber = 0;
        secondNumber = 0;
        operator = undefined;
    }
}
