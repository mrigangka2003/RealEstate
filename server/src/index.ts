import app from './app' ;
import dotenv from 'dotenv';

dotenv.config();


import { PORT } from './config';

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`) ;
})