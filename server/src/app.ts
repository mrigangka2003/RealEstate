import 
    express,
    {
        Request,
        Response,
        NextFunction
    } 
from 'express' ;

import cors from 'cors'
import cookieParser from 'cookie-parser';

import { 
    PostRoutes,
    AuthRoutes,
    TestRoutes,
    UserRoutes,
    chatRoutes,
    messageRoutes 
} from './routes';

import { clientUrl } from './config';
import { verifyToken } from './middleware/verifyToken';


const app = express() ;

app.use(cors({
    origin:clientUrl,
    credentials:true
})) ;
app.use(cookieParser())
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


app.use('/api/users',UserRoutes) ;
app.use('/api/posts',PostRoutes) ;
app.use('/api/auth',AuthRoutes) ;
app.use('/api/test',TestRoutes) ;
app.use('/api/chat',chatRoutes) ;
app.use('/api/messages',messageRoutes) ;



export default app ;