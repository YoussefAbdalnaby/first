const Product = require("../database/product.js");


exports.insertProducts= async (req,res)=>{
try {
    const products=req.body;
    const insertedProducts=await Product.insertMany(products);
    res.status(201).json({message:"products inserted successfully",insertedProducts})

} catch (error) {
    res.status(500).json({message:error.message})
}
}


exports.getProducts = async (req, res) => {
    try {
const category=await Product.distinct("category");
console.log
const products = await Product.aggregate([
    { $match: { category:"Electronics" } },
    { $group: { 
        _id: "$category",
        sumOfProducts: { $sum: "$price" },
        avgPrice: { $avg: "$price" },
        count: { $sum: 1 },
        max: { $max: "$price" },
        min: { $min: "$price" }
    } },
    {

        $project: {
            _id: null,
            category: "$_id",
            sumOfProducts: 1,
            avgPrice: 1,
            count: 1,
            max: 1,
            min: 1
        }

    }

]);
        res.status(200).json({ message: "products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}