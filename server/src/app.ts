import express,{Request ,Response ,NextFunction} from 'express' ;
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { PostRoutes,AuthRoutes } from './routes';

const app = express() ;

app.use(cors()) ;
app.use(cookieParser())
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


app.use('/api/post' , PostRoutes) ;
app.use('/api/auth',AuthRoutes)



app.get('/',(req:Request,res:Response)=>{
    res.send('hi') ;
})

export default app ;


