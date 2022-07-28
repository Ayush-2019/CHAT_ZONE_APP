var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(path.join(__dirname,"public")))

users=[];
io.on('connection',function(socket){
   var user;
   console.log('User connected');
   socket.on('setUser',function(data){
      if(users.indexOf(data)>-1){
         socket.emit('userExists',data+' username is already taken, choose a new username');
      }
      else{
         users.push(data);
         user = data;
         console.log('User named ' + user + ' connected')
         socket.emit('userSet',data);
         socket.broadcast.emit('joined','New user named '+user+' connected!!')
      }
   })

   socket.on('msg',function(data){
      socket.broadcast.emit('all_msg',data);
   })

   socket.on('disconnect',function(){
      console.log(user + ' left the chat!!');
      socket.broadcast.emit('left_chat',user);

      var index = users.indexOf(user)
      users.splice(index,1);
   })

})
http.listen(3000, function(){
   console.log('listening on localhost:3000');
});