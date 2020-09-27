let number = [];
let operator = [];
let tempNum = [];
let tempOp = [];
let finNum = [];

// Remove calculated operators after 1st round of calculation
function cleanOp() {
    for (let i = 0; i < operator.length; i++) {
        if (operator[i].toString() === '+' || operator[i].toString() === '-') {
            tempOp.push(operator[i]);
        }
    };
};

// multipy and divide
function multiDive(number, operator) {
    console.log(`original input number: ${number}`);
    console.log(`original input operator: ${operator}`);
    // let afterMultiDive = [];
    for (let i = 0; i < operator.length; i++) {
        if (operator[i].toString() === '*') {
            number[i+1] *= number[i];
            console.log(number[i+1])
        } else if (operator[i].toString() === '/') {
            number[i+1] = number[i] / number[i+1];
            console.log(number[i+1]);
        } else {
            tempNum.push(number[i]);
        }
        if (i === operator.length-1) {
            tempNum.push(number[i+1]);
        }
    };
    // cleanNum(afterMultiDive);
    cleanOp();
    console.log(`Number array after multiDive: ${tempNum}`);
    console.log(`Operator array after multiDive: ${tempOp}`);
};

// add and substract
function addSubst (tempNum, tempOp) {
    finNum = tempNum[0];
    for (let i = 0; i < tempOp.length; i++) {
        if (tempOp[i].toString() === '+') {
            finNum += tempNum[i+1];
        } else if (tempOp[i].toString() === '-') {
            finNum -= tempNum[i+1];
        }
    };
    console.log(`result: ${finNum}`);
};

// Number keys for input
const numKeys = document.querySelectorAll('.numKey');
// Display to show input/calculation result
const display = document.querySelector('.res_display');

// Click number button and display on result screen
// Temporal storage for input number
let numInput = [];
// Temporal storage for input operator
let optInput = [];
// Array for calculation display
let numOptInput = [];
// Dot counter for multiple dots prevention
let dots = 0;
// numKey counter to prevent empty operator in operator array
let keyIn = 0;
// Get key value of each numKey. store in an array
numKeys.forEach((numKey) => {
    numKey.addEventListener('click', () => {
        // If input num is the first key of the number, and after the 2nd num input round,
        // add the temporary stored oprt input to operator array and clear
        if (keyIn === 0 && number.length > 0) {
            operator.push(optInput);
            optInput = [];
        };
        // Allow only 1 "." input
        if (numKey.textContent.toString() === '.' && dots > 0) {
            dots++;
        } else {
            // Add input number to temporal storage AND display
            numInput.push(numKey.textContent);
            numOptInput.push(numKey.textContent);
            display.textContent = numOptInput.join("");
            keyIn++;
            console.log(`now input: ${numOptInput}`);
            if (numKey.textContent.toString() === '.' && dots === 0) {
                dots++;
            }
        };

        console.log(`current operator array: ${operator}`);
    });
});

const optKeys = document.querySelectorAll('.optr');
// Once optr key is pressed, convert numImput value into number and add to number array
optKeys.forEach((optKey) => {
    optKey.addEventListener('click', () => {
        // Clear counter for number inputs
        dots = 0;
        keyIn = 0;
        // If operator is input consecutively, override
        if (optInput.length > 0) {
            optInput[0] = optKey.textContent;
            numOptInput[-1] = optKey.textContent;
            display.textContent = numOptInput.join('');
        } else {
            // Add input number to 'number' array and clear temporal input storage
            number.push(Number(numInput.join('')));
            numInput = [];
            // Add input operator to tomporal storage AND display
            optInput.push(optKey.textContent);
            numOptInput.push(optKey.textContent);
            display.textContent = numOptInput.join('');
        }
        console.log(`current number array: ${number}`);
    })
})

// If "=" key is pressed, run "operate" function to activate calculation
const equalKey = document.querySelector('.equal');
equalKey.addEventListener('click', () => {
    console.log(`Number array before calculation: ${number}`);
    console.log(`Operator array before calculation: ${operator}`);
    multiDive(number, operator);
    if (tempNum.length === 1) {
        finNum = tempNum;
    } else {
        addSubst(tempNum, tempOp);
    }
    display.textContent = finNum;
})

// Clear all values
const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', () => {
    // Clear all for the next calulation / input value
    number = [];
    operator = [];
    tempNum = [];
    tempOp = [];
    finNum = 0;
    numInput = [];
    optInput = [];
    numOptInput = [];
    display.textContent = '0';
});

// TODO: Create 'delete' function

// // Function for console to activate calculation
// function operate () {
//     // continue getting number and operator until user input equal sign
//     while (op !== '=') {
//         number.push(Number(prompt('Please imput number')));
//         op = (prompt('Please imput operator'));
//         operator.push(op);
//     };
//     multiDive();
//     addSubst();
//     console.log(`result: ${finNum}`);
// };