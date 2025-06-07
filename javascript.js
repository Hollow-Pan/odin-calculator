const inputText = document.querySelector(".input-text");
const buttons = Array.from(document.querySelectorAll(".btn"));

let first = "";
let second = "";
let currOperator = "";
let resetDisplay = false;
let justEvaluated = false;


buttons.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        handleInput(btn.textContent);
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (/[\d+\-*/.=]/.test(key)) {
        handleInput(key);
    }
    else if (key === 'Backspace') {
        handleInput('DEL');
    }
    else if (key === 'Escape') {
        handleInput('AC');
    }
    else if (key === 'Enter'){
        handleInput('=');
    }
});

function handleInput(value){
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else if (value === '=') {
        evaluate();
    } else if (value === 'AC') {
        clearAll();
    } else if (value === 'DEL') {
        deleteLast();
    }
}

function handleNumber(value) {
    if (resetDisplay) {
        inputText.textContent = '';
        resetDisplay = false;
    }
    if (justEvaluated) {
            first = '';
            currOperator = '';
            second = '';
            justEvaluated = false;
        }
    if (value === '.' && inputText.textContent.includes('.')) return;
    // console.log(inputText.textContent.trim().length);
    if (inputText.textContent.trim().length >= 11) return;
    inputText.textContent += value;
}

function handleOperator(op){
    if (inputText.textContent === '') return;
    if (first !== '') evaluate();
    first = inputText.textContent;
    currOperator = op;
    resetDisplay = true;
    justEvaluated = false;
}

function evaluate(){
    if (first === "" || resetDisplay) return;
    second = inputText.textContent;
    const a = +first;
    const b = +second;
    let result;

    switch(currOperator){
        case '+': result = a+b; break;
        case '-': result = a-b; break;
        case '*': result = a*b; break;
        case '/': 
            if (b===0){
                inputText.textContent = "Nah ;-;";
                resetDisplay = true;
                first = "";
                currOperator = "=";
                return;
            }
            else{
                result = a/b;
            }
            break;
    }

    result = Math.round(result*10)/10;
    inputText.textContent = result;
    first = result.toString();
    currOperator = "";
    resetDisplay = true;
    justEvaluated = true;
}

function clearAll(){
    inputText.textContent = '';
    first = '';
    second = '';
    currOperator = '';
    resetDisplay = false;
}

function deleteLast(){
    inputText.textContent = inputText.textContent.slice(0,-1);
}