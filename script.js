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
    
    if (operator !== null && +display.textContent !== num1)
    {
        saveNum();
        displayAnswer(operate(num1, num2, operator));
        clearAllData();
    }
    
    saveNum();

    switch(operation.id)
    {
        case "add-button":
            operator = "+";
            break;
        case "subtract-button":
            operator = "-";
            break;
        case "divide-button":
            operator = "/";
            break;
        case "multiply-button":
            operator = "*";
            break;
    }
}

function doCommand(command)
{
    switch(command.id)
    {
        case "clear-button":
            clearAllData();
            display.textContent = 0;
            break;
        case "backspace-button":
            deleteDigit(display.textContent);
            break;
        case "decimal-button":
            if (num1 !== null && operator !== null && num2 === null)
            {
                clearDisplay();
                saveNum();
            }

            if (!display.textContent.includes("."))
            {
                if (display.textContent.length === 0)
                {
                    display.textContent += "0.";
                }
                else
                {
                    display.textContent += ".";
                }
            }
            break;
        case "equals-button":
            if (isInitialState() || operator === null)
            {
                return;
            }
            saveNum();
            if (num1 && num2 && operator)
            {
                displayAnswer(operate(num1, num2, operator));
                clearAllData();
            }
            break;
    }
}

function isInitialState()
{
    return num1 === null && num2 === null & operator === null && +display.textContent === 0;
}

function deleteDigit(num)
{
    if (num.length > 1)
    {
        display.textContent = num.substring(0, num.length - 1);
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
    console.log(`num1 is a ${typeof num1} and its value is ${num1}`);
    console.log(`num2 is a ${typeof num2} and its value is ${num2}\n`);
}

function clearDisplay()
{
    display.textContent = null;
}

function displayAnswer(result)
{
    if (result && !Number.isInteger(result))
    {
        result = +result.toFixed(3);
    }
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
            if (display.textContent.length === 10)
            {
                return;
            }

            if (num1 !== null && operator !== null && num2 === null)
            {
                clearDisplay();
                saveNum();
            }

            if(display.textContent === "0")
            {
                display.textContent = +display.textContent + +target.textContent;
            }
            else
            {
                display.textContent += target.textContent;
            }
            break;
        case "operator":
            assignOperator(target);
            break;
        case "command":
            doCommand(target);
            break;
    }
});