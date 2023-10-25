const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

//localfile handler function
exports.localFileUpload =async(req,res)=>
{
    try{
       const file=req.files.file;
       console.log("file aagyi->",file);
       let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
       console.log("Path->",path)
       file.mv(path,(err)=>{
        console.log(err);
       });
       res.json({
        success:true,
        message:"local file upload succesfuly",
       });
    }
    catch(error)
    {
     console.log("not able to upload file on server");
     console.log(error);

    }

}

//image upload ka handler

function isFileTypeSupported(type,supportedTypes)
{
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options ={folder};
    console.log("temp file",file.tempFilePath);
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async(req,res)=>{
    try{

        const{name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);


        //validation

        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("file type:",fileType)

        if(!isFileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
               success:false,
               message:'file type no suppurted', 
            })
        }
//file type supported
console.log("uploading to codehelp");
const response=await uploadFileToCloudinary(file,"dipak");
console.log(response);
//db mai entry save
const filedata=await File.create({
    name,
    tags,
    email,
    
})
res.json({
    success:true,
    message:"image succesfuly uploaded"
})


    }
    catch(error){
console.error(error);
res.status(400).json({
    success:false,
    message:"something went wromg",
})
    }
}




// video upload handler

exports.videoUpload=async(req,res)=>
{
   try{

    const{name,tags,email}=req.body;
        console.log(name,tags,email);
 
    const file=req.files.vidoFile;

    //validation
    const supportedTypes=["mp4","mov"];
    const fileType=file.name.split('.')[1].toLowerCase();
    console.log("file type",fileType);
 if (!isFileTypeSupported(fileType,supportedTypes))
 {
    return res.status(400).json({
       success:false,
       message:'file type no suppurted', 
    })
}
//file type supported
console.log("uploading to codehelp");
const response=await uploadFileToCloudinary(file,"dipak");


res.json({
    success:true,
    message:"video succesfuly uploaded"
})


// const filedata=await File.create({
//     name,
//     tags,
//     email,
//     imageUrl
// })
   }
   catch(error){
    console.error(error);
    res.status(400).json({
       
        success:false,
        message:'somthing went wrong'
    })

   } 
}




