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

let firstNumber = '';
let secondNumber = '';
let operator;
let result;
let floatingPointFirst = false;
let floatingPointSecond = false;

buttons.forEach(button => 
{
    if(button.textContent !== 'Clear' && button.textContent !== 'Delete')
        button.addEventListener('click', displayNumbers);
})

function displayNumbers(e){
    let buttonClicked = e.target.textContent;
    let numbersRegex = new RegExp ("^([0-9])$");

    if(operator === undefined){
        if(buttonClicked === '.' && floatingPointFirst === false){
            firstNumber += buttonClicked;
            display.textContent = firstNumber;
            floatingPointFirst = true;
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                firstNumber += buttonClicked;
                display.textContent += buttonClicked;
            }
            else {
                if(buttonClicked !== '=' && firstNumber !== ''){
                    operator = buttonClicked;
                    firstNumber = parseFloat(firstNumber);  
                    display.textContent = firstNumber;
                }
            }
        }   
    }
    else {
        if(buttonClicked === '.' && floatingPointSecond === false){
            secondNumber += buttonClicked;
            floatingPointSecond = true;
            display.textContent = secondNumber;
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                secondNumber += buttonClicked;
                secondNumber = parseFloat(secondNumber);
                display.textContent = secondNumber;
            }
            else {
                if(buttonClicked === '='){
                    result = operate(firstNumber, secondNumber, operator)
                    display.textContent = result;
                    firstNumber = result;
        
                    floatingPointFirst = false;
                    floatingPointSecond = false;
                    secondNumber = '';
                    operator = undefined;
                }
                else {
                    result = operate(firstNumber, secondNumber, operator)
                    display.textContent = result;
                    firstNumber = result;
        
                    secondNumber = '';
                    operator = buttonClicked;
                }
            }
        }            
    }
}
