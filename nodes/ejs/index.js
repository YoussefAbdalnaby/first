const express=require("express")
const app=express()
const ejs=require("ejs")
const path=require("path")
app.set("view engine", "ejs");


const people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});



const viewsPath=path.join(__dirname,'index.ejs')
console.log(viewsPath)

app.get("/",(req,res)=>{

res.send("home page")
})

app.get("/view",(req,res)=>{
    res.render(viewsPath,{people:people}  )
})  

app.listen(3000,()=>{   
    console.log("listening on port 3000")
}   )