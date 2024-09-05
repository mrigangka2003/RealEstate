import {v2 as cloudinary} from "cloudinary" ;
import fs from "fs" ;

import {
    cloudinary_cloud_name,
    cloudinary_api_key,
    cloudinary_api_secret
} from "../config"


cloudinary.config({
    cloud_name:cloudinary_cloud_name,
    api_key:cloudinary_api_key,
    api_secret:cloudinary_api_secret
})
const uploadOnCloudinary = async(localFilePath:string)=>{
    try {
        if(!localFilePath) return null; 

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto' ,
        })
        console.log("File has been uploaded" , response.url) ;
        fs.unlinkSync(localFilePath) ;
        
        return response ;
    } catch (error) {
        fs.unlinkSync(localFilePath) ;
        return null ;
    }
}

export {
    uploadOnCloudinary
}