function add(a, b){
    console.log(a+b);
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    return a/b;
}

function operate(a, b, operate){
    if (operate === "+") add(a, b);
    else if (operate === "-") subtract(a, b);
    else if (operate === "x") multiply(a, b);
    else if (operate === "/") divide(a, b);
}