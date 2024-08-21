import dotenv from 'dotenv' ;

dotenv.config({}) ;

const PORT:number = Number(process.env.PORT) ;

const jwtSecretKey:string = String(process.env.JWT_SECRET_KEY)

const clientUrl:string = String(process.env.CLIENT_URL) ;



//cloudinaryConfig
const cloudinary_cloud_name :string = String(process.env.CLOUDINARY_CLOUD_NAME);
const cloudinary_api_key :string = String(process.env.CLOUDINARY_API_KEY);
const cloudinary_api_secret :string = String(process.env.CLOUDINARY_API_SECRET);

export {
    PORT,
    jwtSecretKey,
    clientUrl,
    cloudinary_cloud_name,
    cloudinary_api_key,
    cloudinary_api_secret
}