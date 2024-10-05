import express,{Request,Response} from "express" ;
import {Server} from "socket.io" ;


const io = new Server({
    cors:{
        origin : "http://localhost:5173"
    }
})

io.on("connection" , (socket) =>{
    socket.on('test',(data)=>{
        console.log(data) ;
    })
})

io.listen(4000)