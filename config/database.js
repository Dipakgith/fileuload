const mongoose=require("mongoose");
require("dotenv").config();
exports.connect=()=>
{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("db coneection succesfull"))
    .catch((error)=>{
        console.log("db connection issue");
        console.error(error);
        process.exit(1);
    });
};


