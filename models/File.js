const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:
    {
        type:String,

    }
});



//post middlewere
fileSchema.post("save",async function(doc){
    try{
     console.log("Doc",doc)

     //transpoter 
     let transpoter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PAss,
        },
     });
     //send mail
     let info = await transpoter.sendMail({
        from:`dipak`,
        to:doc.email,
        subject:"new file uploaded to cloudinary",
        html:`<h2>hello jee</h2><p>file uploadess</p>`
     })
     console.log("INFO",info);

    }
    catch(error){
       console.error(error);
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;