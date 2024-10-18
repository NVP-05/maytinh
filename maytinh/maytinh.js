const screen = document.getElementById('screen');
let currentInput = '';
let previousInput = '';
let operator = '';

const updateScreen = (value) => {
    screen.value = value;
};

const handleNumberClick = (number) => {
    if (currentInput.length < 16) {
        currentInput += number;
        updateScreen(currentInput);
    }
};

const handleOperatorClick = (selectedOperator) => {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
};

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateScreen(currentInput);
};

const clearAll = () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen('');
};

const deleteLast = () => {
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput);
};

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const target = event.target;
    const action = target.dataset.action;
    const buttonContent = target.textContent;

    if (target.matches('button')) {
        if (!action) {
            handleNumberClick(buttonContent);
        } else if (action === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateScreen(currentInput);
            }
        } else if (action === 'clear') {
            clearAll();
        } else if (action === 'delete') {
            deleteLast();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            handleOperatorClick(action);
        } else if (action === 'calculate') {
            calculate();
        }
    }
});
