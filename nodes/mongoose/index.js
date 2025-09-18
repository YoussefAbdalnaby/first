const { name } = require('ejs');
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
connectToDatabase()
const userSchema =new mongoose.Schema({
    email:String,
name:String,
age:Number,
isActive:Boolean,
tags:[String],
createdAt:{type:Date,default:Date.now},



})
const sampleUsers = [
  {
    email: "john.doe@gmail.com",
    name: "John Doe",
    age: 28,
    isActive: true,
    tags: ["developer", "javascript", "nodejs", "react"]
  },
  {
    email: "jane.smith@yahoo.com",
    name: "Jane Smith", 
    age: 32,
    isActive: true,
    tags: ["designer", "ui/ux", "figma", "creative"]
  },
  {
    email: "mike.johnson@outlook.com",
    name: "Mike Johnson",
    age: 24,
    isActive: false,
    tags: ["backend", "python", "django", "api"]
  },
  {
    email: "sarah.wilson@gmail.com",
    name: "Sarah Wilson",
    age: 29,
    isActive: true,
    tags: ["project-manager", "scrum", "agile", "leadership"]
  },
  {
    email: "alex.brown@hotmail.com",
    name: "Alex Brown",
    age: 26,
    isActive: true,
    tags: ["devops", "aws", "docker", "kubernetes"]
  },
  {
    email: "emily.davis@gmail.com",
    name: "Emily Davis",
    age: 31,
    isActive: false,
    tags: ["qa", "testing", "automation", "selenium"]
  },
  {
    email: "david.taylor@yahoo.com",
    name: "David Taylor",
    age: 35,
    isActive: true,
    tags: ["fullstack", "vue", "mongodb", "express"]
  },
  {
    email: "lisa.anderson@gmail.com",
    name: "Lisa Anderson",
    age: 27,
    isActive: true,
    tags: ["mobile", "react-native", "ios", "android"]
  },
  {
    email: "robert.thomas@outlook.com",
    name: "Robert Thomas",
    age: 33,
    isActive: false,
    tags: ["data-scientist", "python", "machine-learning", "ai"]
  },
  {
    email: "jennifer.white@gmail.com",
    name: "Jennifer White",
    age: 30,
    isActive: true,
    tags: ["frontend", "angular", "typescript", "sass"]
  },
  {
    email: "chris.martin@yahoo.com",
    name: "Chris Martin",
    age: 25,
    isActive: true,
    tags: ["intern", "student", "learning", "javascript"]
  },
  {
    email: "amanda.garcia@gmail.com",
    name: "Amanda Garcia",
    age: 28,
    isActive: true,
    tags: ["content-creator", "marketing", "social-media", "copywriting"]
  },
  {
    email: "kevin.rodriguez@hotmail.com",
    name: "Kevin Rodriguez",
    age: 29,
    isActive: false,
    tags: ["security", "cybersecurity", "penetration-testing", "ethical-hacking"]
  },
  {
    email: "michelle.lee@gmail.com",
    name: "Michelle Lee",
    age: 26,
    isActive: true,
    tags: ["business-analyst", "requirements", "stakeholder", "documentation"]
  },
  {
    email: "daniel.clark@outlook.com",
    name: "Daniel Clark",
    age: 34,
    isActive: true,
    tags: ["architect", "system-design", "microservices", "cloud"]
  },
  {
    email: "rachel.lewis@yahoo.com",
    name: "Rachel Lewis",
    age: 27,
    isActive: true,
    tags: ["ui-developer", "css", "html", "responsive-design"]
  },
  {
    email: "jason.walker@gmail.com",
    name: "Jason Walker",
    age: 31,
    isActive: false,
    tags: ["database-admin", "sql", "postgresql", "optimization"]
  },
  {
    email: "nicole.hall@hotmail.com",
    name: "Nicole Hall",
    age: 24,
    isActive: true,
    tags: ["junior-dev", "bootcamp", "learning", "enthusiastic"]
  },
  {
    email: "brian.allen@gmail.com",
    name: "Brian Allen",
    age: 36,
    isActive: true,
    tags: ["team-lead", "mentor", "code-review", "management"]
  },
  {
    email: "stephanie.young@outlook.com",
    name: "Stephanie Young",
    age: 28,
    isActive: true,
    tags: ["product-owner", "roadmap", "user-stories", "prioritization"]
  }
];
const User=mongoose.model('User',userSchema)

const user=new User({name:'youssefddsadas',age:23122})

async function addManyUsers(listOFUsers) {
try {
        await User.insertMany(listOFUsers);
console.log("Multiple users added successfully");
} catch (error) {
    console.log(error.message)
}

}
//addManyUsers(sampleUsers)


async function adduser(newUser){
try {
    await user.save(user)
    console.log("user added successfully",user)
} catch (error) {
    console.log(error.message)
}
}

//adduser(user)

async function getUsers()
{
try {
let users=  await  User.find();
console.log(users)
console.log(users.length)

} catch (error) {
    console.log(error.message)
    
}

}
//getUsers()

async function getUsersMainuplate()
{
try {
//let users=  await  User.find({isActive:true,age:{$gt:30}});
//let users=  await  User.findById('68c58eea7c818f49b7026699');
let users=  await  User.find().select('name age -_id').limit(5).skip(5).sort({age:-1});
let counter=await User.countDocuments({isActive:true})
console.log("the number is ",counter)
console.log(users)
console.log(users.length)

} catch (error) {
    console.log(error.message)
    
}

}
//getUsersMainuplate()

async function deleteUserByID(id) {
try {
    const user =await User.findByIdAndDelete(id)
    if(user)console.log("the deleted user is ",user)
    else console.log("user not found")
} catch (error) {
    console.log(error.message)
    
}
}

//deleteUserByID('68c58eea7c818f49b7026699')
async function updateUser(id, name, tags, age) {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: { name: name, age: age },
                $push: { tags: tags }
            },
            { new: true, runValidators: true }
        );
        if (user) {
            console.log("Updated user:", user);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error.message);
    }
}
//updateUser('68c58eea7c818f49b7026693',"john dawy","new Tag",100)