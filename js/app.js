let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;
let divByZerroError = "Ошибка: деление на ноль";

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
    if (display.textContent === divByZerroError) {
        display.classList.add('error');
    } else {
        display.classList.remove('error');
    }
}

function appendNumber(number) {
    if (currentInput === '0' || resetScreen || currentInput === divByZerroError) {
        currentInput = '';
        resetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === divByZerroError) {
        clearDisplay();
        return;
    }
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function calculate() {
    if (operation === null || resetScreen) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (operation === '/' && current === 0) {
        currentInput = divByZerroError;
        operation = null;
        updateDisplay();
        return;
    }
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput === divByZerroError) {
        clearDisplay();
        return;
    }
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
        return;
    }
    
    switch (key) {
        case '+':
            appendOperator('+');
            break;
        case '-':
            appendOperator('-');
            break;
        case '*':
            appendOperator('*');
            break;
        case '/':
            appendOperator('/');
            break;
        case '.':
            appendNumber('.');
            break;
        case 'Enter':
        case '=':
            calculate();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Escape':
            clearDisplay();
            break;
    }
    
    if ((key >= '0' && key <= '9') || 
        key === '+' || key === '-' || key === '*' || key === '/' || 
        key === '.' || key === 'Enter' || key === '=' || 
        key === 'Backspace' || key === 'Escape') {
        event.preventDefault();
    }
});

updateDisplay();
