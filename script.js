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
const deleteButton = document.querySelector('button[value="Backspace"]');

let firstNumber = '';
let secondNumber = '';
let operator;
let result = '';
let floatingPointFirst = false;
let floatingPointSecond = false;

clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteLastClicked);
window.addEventListener('keyup', whichFunctionExecute);
buttons.forEach(button => 
{
    if(button.textContent !== 'Clear' && button.textContent !== 'Delete'){
        button.addEventListener('click', displayNumbers);
    }     
})

function whichFunctionExecute(e){
    switch (e.key) {
        case 'Backspace':
            deleteLastClicked();
            break;

        case 'Delete':
            clearDisplay();
            break;
    
        default:
            displayNumbers(e);
            break;
    }
}

function displayNumbers(e){
    let buttonClicked;
    let numbersRegex = new RegExp ("^([0-9])$");
    let symbolsRegex = new RegExp ("^([*+-/])$")

    if(e.type === 'keyup'){
        buttonClicked = e.key;
    }
    else {
        buttonClicked = e.target.value;
    }

    if(buttonClicked === 'Backspace' || buttonClicked === 'Delete') return;

    if(buttonClicked === ',') buttonClicked = '.';

    // IF STATMENT ONLY FOR GET THE FIRST NUMBER
    if(operator === undefined){
        if(buttonClicked === '.' && floatingPointFirst === false){
            if(firstNumber !== ''){
                firstNumber += buttonClicked;
                displayResult.textContent = firstNumber;
                floatingPointFirst = true;
            }
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                firstNumber += buttonClicked;
                displayResult.textContent += buttonClicked;
            }
            else {
                if(buttonClicked !== 'Enter' && firstNumber !== ''){
                    if(buttonClicked !== '.' && symbolsRegex.test(buttonClicked)){
                        operator = buttonClicked;
                        firstNumber = parseFloat(firstNumber);  
                        displayOperation.textContent = `${firstNumber} ${operator} `;
                    }
                }
            }
        }   
    }
    else { // WHEN THE OPERATOR IS SELECTED, THE SECOND NUMBER CAN NOW BE OBTAINED
        if(buttonClicked === '.' && floatingPointSecond === false){
            if(secondNumber !== ''){
                secondNumber += buttonClicked;
                displayResult.textContent = secondNumber;
                floatingPointSecond = true;
            }
        }
        else {
            if(numbersRegex.test(buttonClicked)){
                secondNumber += buttonClicked;
                displayResult.textContent = secondNumber;
            }
            else { // THIS ELSE IS FOR THE RESULT, WHEN THE USER CLICK ON THE EQUAL BUTTON OR ANY OTHER OPERATOR
                displayOperation.textContent += secondNumber;

                if(buttonClicked === 'Enter' && secondNumber !== ''){
                    if(operator === '/' && secondNumber == 0){
                        showErrorMessage();
                    }
                    else {
                        secondNumber = parseFloat(secondNumber);
                        result = operate(firstNumber, secondNumber, operator)
                        displayResult.textContent = result;
                        firstNumber = result;
        
                        floatingPointFirst = true;
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
                                displayResult.textContent = result;
                                firstNumber = result;
                    
                                floatingPointFirst = true;
                                floatingPointSecond = false;
                                secondNumber = '';
                                operator = buttonClicked;
                            }
                        }
                    }
                }
                if(operator !== undefined){
                    displayOperation.textContent = `${result} ${operator} `;
                }
            }
        }
    }
    // console.log(firstNumber);
    // console.log(operator);
    // console.log(secondNumber);
}

function clearDisplay(){
    displayOperation.textContent = '';
    displayResult.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = undefined;
}

function deleteLastClicked(){
    let stringToChange = displayResult.textContent;

    if(operator === undefined){
        stringToChange = stringToChange.slice(0, -1);
        firstNumber = stringToChange;
        displayResult.textContent = stringToChange;
    }
    else {
        if(secondNumber === ''){
            displayResult.textContent = firstNumber;
            operator = undefined;
        }
        else {
            stringToChange = stringToChange.slice(0, -1);
            secondNumber = stringToChange;
            displayResult.textContent = stringToChange;
        }
    }
}

function showErrorMessage(){
    // DISABLE ALL BUTTONS IF THE USER TRIES TO DIVIDE BY 0
    buttons.forEach(element => {
        element.disabled = true;
    });

    displayResult.textContent = "ARE YOU KIDDING ME? ";
    
    // THEN AFTER 1 SECOND, ALL BUTTONS ARE ENABLED AGAIN
    setTimeout(() => 
    {
        displayResult.textContent = '';
        displayOperation.textContent = '';
        buttons.forEach(element => {
            element.disabled = false;
        });
    }, 1000);

    firstNumber = '';
    operator = undefined
    secondNumber = '';
}