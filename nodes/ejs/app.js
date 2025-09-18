const express = require('express');
const app = express();  
const ejs = require('ejs');
const path = require('path');
app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, 'index.ejs');
console.log(viewsPath);
const people = ['geddy', 'neil', 'alex'];
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'home page welcome to the api' }) });

app.get("/get",(req,res)=>{
res.json(people)

} )
app.get("/products/:id",(req,res)=>{
    console.log(req.params)
const product =[{id:1,name:'phone'},{id:2,name:'laptop'}];
const singleProduct=product.find(p=>p.id===parseInt(req.params.id));
if(singleProduct) res.json(singleProduct);
else res.status(404).send('Product not found') 
} )

app.post("/add",(req,res)=>{
    console.log(req.body.name)
    people.push(req.body.name)

    res.json({message:'data received successfully'})  
}) 

const books = [
    {
        "id": 1,
        "bookname": "The Great Gatsby",
        "title": "The Great Gatsby"
    },
    {
        "id": 2,
        "bookname": "To Kill a Mockingbird",
        "title": "To Kill a Mockingbird"
    },
    {
        "id": 3,
        "bookname": "1984",
        "title": "1984"
    }];
app.put("/books/:id",(req,res)=>{   
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).json({message:"book not found"})
    else{
book.bookname=req.body.bookname;
console.log(books)
 
res.json({message:"book updated successfully",book})
    }
    })



app.delete("/books/:id",(req,res)=>{
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));  
    console.log(bookIndex) 
    if(bookIndex===-1) res.status(404).json({message:"book not found"})
    else{
        books.splice(bookIndex,1);
        console.log(books)
        res.json({message:"book deleted successfully",books})
    }   
} )

    app.listen(3000, () => {   
    console.log('listening on port 3000');
} );
