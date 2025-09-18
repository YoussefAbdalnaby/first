const multer=require("multer")
const path=require("path")
const fs=require("fs")


const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1E9)
        cb(null,file.fieldname+"-"+uniqueSuffix+path.extname(file.originalname))
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/jpg","image/png"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("only jpeg,jpg and png are allowed"),false)
    }
}
const upload=multer({storage:storage,fileFilter:fileFilter,limits:{fileSize:1024*1024*5}
})
module.exports=upload
        

