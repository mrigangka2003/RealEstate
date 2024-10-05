import express,{Request,Response} from "express" ;
import {Server} from "socket.io" ;

interface User {
    userId : string ;
    socketId : string ;
}

const io = new Server({
    cors:{
        origin : "http://localhost:5173"
    }
})

let onlineUser : User[] = [] ;

const addUser=(userId:string , socketId:string):void=>{
    const exitstingUser = onlineUser.find((user)=>user.userId===userId) ;
    if(!exitstingUser){
        onlineUser.push({userId , socketId}) ;
    }
}

const removeUser = (socketId: string):void=>{
    onlineUser = onlineUser.filter((user)=> user.socketId !==socketId) ;
}

const getUser = (userId:string) :User|undefined=>{
    return onlineUser.find((user) => user.userId === userId);
}

io.on("connection" , (socket) =>{
    socket.on('newUser' , (userId)=>{
        addUser(userId , socket.id) ;
        console.log(onlineUser) ;
    })

    socket.on('sendMessage' ,({ receiverId,data }: { receiverId: string, data: any })=>{
        const receiver = getUser(receiverId) ;
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
        }
    })

    socket.on('disconnect',()=>{
        removeUser(socket.id) ;
    })
})

io.listen(4000)