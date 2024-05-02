const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
    if (num2 === 0)
    {
        return "Error";
    }
    return num1 / num2;
};

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
    if (operator === operation.textContent)
    {
        return;
    }

    if (num1 !== null && operator !== null && num2 !== null)
    {
        saveNum();
        displayAnswer(operate(num1, num2, operator));
        clearAllData();
    }

    if (num1 === null && operator === null)
    {
        saveNum();
    }

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
    displayCurrentOperation();
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

            if (!display.textContent.includes(".") && !isPassDigitLimit())
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
            if (num1 !== null && num2 !== null && operator !== null)
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
    if (clearDivideByZeroError())
    {
        return;
    }

    if (operator !== null && num2 === null)
    {
        return;
    }

    if (num.length > 1)
    {
        display.textContent = num.substring(0, num.length - 1);
    }
    else if (num.length === 1)
    {
        display.textContent = "0";
    }

    if (num1 === null)
    {
        return;
    }
    if (num1 !== null && num2 !== null)
    {
        saveNum();
    }
    else
    {
        num1 = +display.textContent;
    }
    displayCurrentOperation();
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
    if (isNaN(result))
    {
        display.textContent = result;
        return;
    }

    if (result && !Number.isInteger(result))
    {
        result = +result.toFixed(3);
    }
    display.textContent = result;
}

function displayCurrentOperation()
{
    if (num2 !== null)
    {
        operationsDisplay.textContent = `${num1} ${operator} ${num2}`;
    }
    else
    {
        operationsDisplay.textContent = `${num1} ${operator}`;
    }
}

function clearDivideByZeroError()
{
    if (isNaN(display.textContent))
    {
        clearAllData();
        display.textContent = 0;
        return true;
    }
}

function clearAllData()
{
    num1 = null;
    num2 = null;
    operator = null;
    operationsDisplay.textContent = "\u00A0";
}

function isPassDigitLimit()
{
    return display.textContent.length === 10;
}

let num1 = null;
let num2 = null;
let operator = null;

const display = document.querySelector("#calculator-display-input");
const buttonsContainer = document.querySelector("#calculator-buttons-container");
const operationsDisplay = document.querySelector("#calculator-display-ongoing");

const allButtons = buttonsContainer.children;

buttonsContainer.addEventListener("click", (event) => {
    let target = event.target;

    switch(target.className)
    {
        case "digit":
            if (clearDivideByZeroError())
            {
                return;
            }        

            if (isPassDigitLimit() && !(num1 !== null && operator !== null && num2 === null))
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

            if (num2 !== null)
            {
                saveNum();
                displayCurrentOperation();
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

document.addEventListener("keydown", (event) => {
    switch(event.key)
    {
        case "Escape":
            allButtons[0].click();
            break;
        case "Backspace":
            allButtons[1].click();
            break;
        case "+":
            allButtons[2].click();
            break;
        case "1":
            allButtons[3].click();
            break;
        case "2":
            allButtons[4].click();
            break;
        case "3":
            allButtons[5].click();
            break;
        case "-":
            allButtons[6].click();
            break;
        case "4":
            allButtons[7].click();
            break;
        case "5":
            allButtons[8].click();
            break;
        case "6":
            allButtons[9].click();
            break;
        case "/":
            allButtons[10].click();
            break;
        case "7":
            allButtons[11].click();
            break;
        case "8":
            allButtons[12].click();
            break;
        case "9":
            allButtons[13].click();
            break;
        case "*":
            allButtons[14].click();
            break;
        case ".":
            allButtons[15].click();
            break;
        case "0":
            allButtons[16].click();
            break;
        case "Enter":
            allButtons[17].click();
            break;
    }
    console.log(event.key);
}, false);