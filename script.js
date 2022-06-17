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
                    if(operator === '/' && secondNumber === 0){
                        showErrorMessage();
                    }
                    else {
                        if(buttonClicked !== '.'){
                            secondNumber = parseFloat(secondNumber);
                            result = operate(firstNumber, secondNumber, operator)
                            display.textContent = result;
                            firstNumber = result;
                
                            floatingPointFirst = false;
                            floatingPointSecond = false;
                            secondNumber = '';
                            operator = undefined;
                        }
                    }
                }
                else {
                    if(secondNumber !== ''){
                        if(operator === '/' && secondNumber === 0){
                            showErrorMessage();
                        }
                        else {
                            if(buttonClicked !== '.'){
                                secondNumber = parseFloat(secondNumber);
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
        }            
    }
    console.log(firstNumber);
    console.log(operator);
    console.log(secondNumber);
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