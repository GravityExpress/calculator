const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

function operate(num1, num2, operation)
{
    switch (operation)
    {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "/":
            return divide(num1, num2);
        case "*":
            return multiply(num1, num2);
    }
}

function assignOperator(operation)
{
    if (operator !== null)
    {
        saveNum();
        displayAnswer(operate(num1, num2, operator));
        clearAllData();
    }

    switch(operation.id)
    {
        case "add-button":
            operator = "+";
            saveNum();
            break;
        case "subtract-button":
            operator = "-";
            saveNum();
            break;
        case "divide-button":
            operator = "/";
            saveNum();
            break;
        case "multiply-button":
            operator = "*";
            saveNum();
            break;
    }
}

function doCommand(command)
{
    switch(command.id)
    {
        case "clear-button":
            clearAllData();
            clearDisplay();
            break;
        case "backspace-button":
            break;
        case "decimal-button":
            break;
        case "equals-button":
            saveNum();
            if (num1 && num2 && operator)
            {
                displayAnswer(operate(num1, num2, operator));
                clearAllData();
            }
            break;
    }
}

function saveNum()
{
    if (num1 === null)
    {
        num1 = +display.textContent;
    }
    else
    {
        num2 = +display.textContent;
    }

    console.log(`num1 is a ${typeof num1} and its value is ${num1}`)
    console.log(`num2 is a ${typeof num2} and its value is ${num2}`)
}

function clearDisplay()
{
    console.log(`num1 is a ${typeof num1} and its value is ${num1}`)
    console.log(`num2 is a ${typeof num2} and its value is ${num2}`)
    if (operator !== null)
    {
        display.textContent = null;
    }
}

function displayAnswer(result)
{
    display.textContent = result;
}

function clearAllData()
{
    num1 = null;
    num2 = null;
    operator = null;
}

let num1 = null;
let num2 = null;
let operator = null;

const display = document.querySelector("#calculator-display");
const buttonsContainer = document.querySelector("#calculator-buttons-container");

buttonsContainer.addEventListener("click", (event) => {
    let target = event.target;

    switch(target.className)
    {
        case "digit":
            clearDisplay();
            display.textContent += target.textContent;
            break;
        case "operator":
            assignOperator(target);
            break;
        case "command":
            doCommand(target);
            break;
    }
});