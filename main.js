const form=document.getElementById('form');
const input=document.getElementById('input');
const messages=document.getElementById('messages');

form.addEventListener("submit",function(e){
    e.preventDefault();
    if(input.value){
        const li=document.createElement("li");
        li.textContent=input.value;
        messages.appendChild(li);
        input.value="";
    }   
});

const dateButton=document.getElementById('date');
dateButton.addEventListener("click",function(){
const h1= document.createElement("h1")
h1.innerHTML=`date is ${Date()}`
document.body.appendChild(h1)
}
)
