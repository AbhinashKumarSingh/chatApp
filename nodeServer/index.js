   const express=require("express");
   const User=require("./schema")

const path=require("path");
const mongoose=require("mongoose");
    const app=express();

   const users={};

mongoose.connect('mongodb://localhost:27017/chatData',{
    useNewUrlParser:true
}).then(()=>{
    console.log('connection successfull')
}).catch((err)=>console.log(err.message));
 var http = require('http'),
     fs = require('fs'),
    socketio=require("socket.io");

app.use(express.static(path.join(__dirname,'public')))
 
  const server=http.createServer(app)

    
    

server.listen(3000,()=>{
    console.log("server connected");
})

const io=socketio(server)
 
 
 io.on("connection",socket=>{
    // console.log('socket connected')
         socket.on('new-user-joined',name=>{
             console.log('New user',name);
             users[socket.id]=name;
             socket.broadcast.emit('user-joined',name);
         });
    
         socket.on('send',message=>{
            
             socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
              const UserData=new User({id:socket.id,message:message,name:users[socket.id]});
               UserData.save().then(data=>console.log(data)).catch(error=>console.log(error.message))
            
         });
     })

