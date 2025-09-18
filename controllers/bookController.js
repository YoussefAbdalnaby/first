const bookModel = require('../database/book.js');


 exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        console.log("Books from DB:", books); // Debugging line
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


 exports.getByID = async (req, res) => {
    try {
        const books = await bookModel.findOne({_id:req.params.id}).select("-__v -createdAt");
        console.log("Books from DB:", books); // Debugging line
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
exports.addBook = async (req, res) => { 
    try {
        const checker=await bookModel.findOne({title:req.body.title})
        if(checker) res.status(400).json({message:"book title must be unique"})
            else{
        const book = await bookModel.create(req.body);
        res.status(201).json(book);
            }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deleteBook = async (req, res) => {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id);  
        if(!book) return res.status(404).json({message:"book not found"})
        console.log("Deleted Book:", book.title); // Debugging line
        res.status(200).json({message:"book deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}


exports.updateBook = async (req, res) => {
    try {
        const book = await bookModel.findByIdAndUpdate(req.params.id
            ,req.body
            ,{new:true,runValidators:true});
        if(!book) return res.status(404).json({message:"book not found"})
        console.log("Updated Book:", book);
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}