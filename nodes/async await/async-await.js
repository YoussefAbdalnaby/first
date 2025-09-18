const fs=require('fs').promises;

async function simpleReadfile() {
   try {
     const data=await   fs.readFile('input.txt', 'utf-8')
 console.log(data);
    
   } catch (error) {
    console.log(error.message);
   } 

}
async function divide(a,b) {
try {
        if(b===0) {
        throw new Error("Division by zero is not allowed");
    }
    return a/b;
} catch (error) {
    console.log(error.message);
    
}
}

async function performDivision() {
    const result = await divide(10,2);
    console.log("Result:", result);
}

console.log("Before division");
performDivision();
console.log("After division");
