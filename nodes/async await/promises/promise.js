const fs=require('fs').promises;

// Read file using Promise-based API
/* fs.readFile('input.txt','utf-8')
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.error(err);
});
console.log("read operation finsihed");

console.log("starting the read operation");

// Async function to read file using async/await
async function simpleReadfile ()
{
    try {
        const data = await fs.readFile('input.txt','utf-8');
        console.log(data);

    } catch (error) {
        console.log(error.message);
    }
}

console.log("before calling the function");
simpleReadfile();
console.log("after calling the function"); */

function divide (a,b)
{
    return new Promise((resolve,reject)=>{
        if(b===0)
        {
            reject(new Error("Division by zero is not allowed"));
        }
        else{
            resolve(a/b);
        }
    });
}
console.log("Before division");
divide(10,2)
.then(result=>{
    console.log("Result:",result);
})
.catch(err=>{
    console.error("Error:",err.message);
});
console.log("After division");