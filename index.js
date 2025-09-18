const express=require("express")
const app=express()
const database=require("./database/database.js")
const bookRoute=require("./routes/bookRoute.js")
const userRoute=require("./routes/userRoute.js")
const imageRoute=require("./routes/imageRoute.js")
const productRoute=require("./routes/productRoute.js")
const moiveRoute=require("./routes/moiveRoute.js")
require("dotenv").config()


app.use(express.json())


database.connectToDatabase()



app.use("/api/books",bookRoute)
app.use("/api/users",userRoute)
app.use("/api/images",imageRoute)
app.use("/api/products",productRoute)
app.use("/api/moives",moiveRoute)






app.listen(3000,()=>{   
    console.log("listening on port 3000")
}   )