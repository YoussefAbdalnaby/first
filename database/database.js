const mongoose = require('mongoose');
const uri = `mongodb+srv://youssefabdalnaby22:jnGhyY7L5NYKurIO@firstdb.a6xnaav.mongodb.net/'library'?retryWrites=true&w=majority&appName=firstdb`;
async function connectToDatabase() {

try {
   await mongoose.connect(uri)
        console.log('✅ Connected to MongoDB');
} catch (error) {
console.error('❌ Failed to connect:', error.message);
    process.exit(1);
}
}
exports.connectToDatabase=connectToDatabase