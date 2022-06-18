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
    let result;

    switch (operator) {
        case '+':
            result = add(a, b);
            return Number.isInteger(result) ? result : result.toFixed(4);

        case '-':
            result = subtract(a, b);
            return Number.isInteger(result) ? result : result.toFixed(4);

        case '*':
            result = multiply(a, b);
            return Number.isInteger(result) ? result : result.toFixed(4);

        case '/':
            result = divide(a, b);
            return Number.isInteger(result) ? result : result.toFixed(4);
    }
}

const display = document.querySelector('#display');
const displayOperation = document.querySelector('#operation');
const displayResult = document.querySelector('#result');
const buttons = document.querySelectorAll('.button');
const clearButton = document.querySelector('button[value="clear"]');
const deleteButton = document.querySelector('button[value="delete"]');

let firstNumber = '';
let secondNumber = '';
let operator;
let result;
let floatingPointFirst = false;
let floatingPointSecond = false;
let lastButtonClicked;

clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteLastClicked);

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
            if(firstNumber !== ''){
                firstNumber += buttonClicked;
                display.textContent = firstNumber;
                floatingPointFirst = true;
            }
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                firstNumber += buttonClicked;
                display.textContent += buttonClicked;
            }
            else {
                if(buttonClicked !== '=' && firstNumber !== ''){
                    if(buttonClicked !== '.'){
                        operator = buttonClicked;
                        firstNumber = parseFloat(firstNumber);  
                        display.textContent = firstNumber;
                    }
                }
            }
        }   
    }
    else {
        if(buttonClicked === '.' && floatingPointSecond === false){
            if(secondNumber !== ''){
                secondNumber += buttonClicked;
                display.textContent = secondNumber;
                floatingPointSecond = true;
            }
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                secondNumber += buttonClicked;
                display.textContent = secondNumber;
            }
            else {
                if(buttonClicked === '=' && secondNumber !== ''){
                    if(operator === '/' && secondNumber == 0){
                        showErrorMessage();
                    }
                    else {
                        secondNumber = parseFloat(secondNumber);
                        result = operate(firstNumber, secondNumber, operator)
                        display.textContent = result;
                        firstNumber = result;
            
                        floatingPointSecond = false;
                        secondNumber = '';
                        operator = undefined;
                    }
                }
                else {
                    if(secondNumber !== ''){
                        if(operator === '/' && secondNumber == 0){
                            showErrorMessage();
                        }
                        else {
                            if(buttonClicked !== '.'){
                                secondNumber = parseFloat(secondNumber);
                                result = operate(firstNumber, secondNumber, operator)
                                display.textContent = result;
                                firstNumber = result;
                    
                                floatingPointSecond = false;
                                secondNumber = '';
                                operator = buttonClicked;
                            }
                        }
                    }
                }
            }
        }            
    }

    lastButtonClicked = buttonClicked;
}

function clearDisplay(){
    display.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = undefined;
}

function deleteLastClicked(){
    let stringToChange = display.textContent;

    if(operator === undefined){
        stringToChange = stringToChange.slice(0, -1);
        firstNumber = stringToChange;
        display.textContent = stringToChange;
    }
    else {
        if(secondNumber === ''){
            display.textContent = firstNumber;
            operator = undefined;
        }
        else {
            stringToChange = stringToChange.slice(0, -1);
            secondNumber = stringToChange;
            display.textContent = stringToChange;
        }
    }
}

function showErrorMessage(){
    // DISABLE ALL BUTTONS IF THE USER TRIES TO DIVIDE BY 0
    buttons.forEach(element => {
        element.disabled = true;
    });

    display.textContent = "ARE YOU KIDDING ME? ";
    
    // THEN AFTER 1 SECOND, ALL BUTTONS ARE ENABLED AGAIN
    setTimeout(() => 
    {
        display.textContent = '';
        buttons.forEach(element => {
            element.disabled = false;
        });
    }, 1000);

    firstNumber = '';
    operator = undefined
    secondNumber = '';
}