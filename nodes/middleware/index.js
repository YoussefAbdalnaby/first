const express = require('express');
app = express();

const simpleMiddleware= (req,res,next)=>
    {
        console.log("run every time")
        next()
    }


app.use(simpleMiddleware)


app.get("/",simpleMiddleware,(req,res)=>{
    console.log("home page")
    res.send('home page');
})


app.listen(3000, () => {
    console.log('Listening on port 3000...');
});