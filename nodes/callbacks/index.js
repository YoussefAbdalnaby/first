
function person(name,callbackfn){
console.log("hello "+name);
callbackfn();
}

function saybye(){
console.log("bye");
}

person("youssef",saybye);


const fs =require('fs');

fs.readFile('input.txt',"utf-8",(err,data)=>{
if(err) return console.error(err);
console.log(data);
})