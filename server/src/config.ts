import dotenv from 'dotenv' ;

dotenv.config({}) ;

const PORT:number = Number(process.env.PORT) ;

const jwtSecretKey:string = String(process.env.JWT_SECRET_KEY)

export {
    PORT,
    jwtSecretKey
}