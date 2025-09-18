const express=  require("express")
const router=express.Router()
const bookController=require("../controllers/bookController.js")

router.get("/get",bookController.getAllBooks)
router.get("/get/:id",bookController.getByID)
router.post("/add",bookController.addBook)
router.delete("/delete/:id",bookController.deleteBook)
router.put("/update/:id",bookController.updateBook )

module.exports=router
