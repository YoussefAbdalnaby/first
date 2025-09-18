function sumtwoNumbers(a, b) {
    return a + b;
}

function substractTwoNumbers(a, b) {
    return a - b;
}


function multiplyTwoNumbers(a, b) {
    return a * b;
}

function divideTwoNumbers(a, b) {
    if(b==0){
        throw new Error("Division by zero is not allowed.");

    }
    return a / b;
}

module.exports = { sumtwoNumbers, substractTwoNumbers, multiplyTwoNumbers, divideTwoNumbers };