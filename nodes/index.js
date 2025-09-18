const e = require('express');
const firstModule=require('./sum');

console.log(firstModule.sumtwoNumbers(5,6));
console.log(firstModule.substractTwoNumbers(5,6));
console.log(firstModule.multiplyTwoNumbers(5,6));
try {
  console.log(firstModule.divideTwoNumbers(5,0)); 
} catch (error) {
  console.error('Error dividing numbers:', error.message);
}