const express=require('express');
const app=express();


app.use(express.json());
app.use((req,res,next,err)=>{
console.log(err.message);
res.status(500).send('Something broke!');
next();   
})

app.get('/',(req,res)=>{
    console.log("home page")
    res.send('home page');
} );


app.get("/products",(req,res)=>{
const product =[{id:1,name:'phone'},{id:2,name:'laptop'}];
    res.json(product);

})


app.get("/products/:id",(req,res)=>{
    console.log(req.params)
const product =[{id:1,name:'phone'},{id:2,name:'laptop'}];
const singleProduct=product.find(p=>p.id===parseInt(req.params.id));
if(singleProduct) res.json(singleProduct);
else res.status(404).send('Product not found') 

} )


app.post("/api/data",(req,res)=>{
        console.log("data page")

    res.json({
message:'Data received successfully',
data:{id:1,name:'John'}
    });
} );


app.listen(3000,()=>{
    console.log('Listening on port 3000...');
}   );
