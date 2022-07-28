var socket = io('http://localhost:3000');
      /**/
      var user;
      function setUser(){
         socket.emit('setUser',document.getElementById('name').value);
      }
      socket.on('userExists',function(data){
         alert(data);
      });

      
      

      socket.on('userSet',function(data){
         user=data;
         document.body.innerHTML='<body><div id="logo"><img src="chat_app_logo.jpg" width="150px" height="150px"></div>\
         <div id="container">\
            </div>\<br>\
            <form id="msg_form">\
               <input type="text" id="message">\
               <button type="button" id="btn2" onclick="sendMessage()">Send</button>\
               </form></body>';
               document.title = data + '-Chat Zone';
               document.getElementById('container').innerHTML = '<b>Welcome ' + data + '</b><br>'
               
         
      });

      // Messaging System
      
      function sendMessage(){
         var container = document.getElementById('container');
         var division = document.createElement('div');
         var msg = document.getElementById('message').value;
         if(msg){

            socket.emit('msg',{user:user,msg:msg});
            division.append('You: '+msg);
         division.classList.add('right');
         division.classList.add('my_msg');
         container.append(division);
         document.getElementById('container').innerHTML+='<br><br>';
         document.getElementById('message').value='';
         }

      }

      socket.on('all_msg',function(data){
         var division = document.createElement('div');
         division.innerText = data.user + ': ' + data.msg;
         division.classList.add('left');
         division.classList.add('oth_msg');
         document.getElementById('container').append(division);
         document.getElementById('container').innerHTML += '<br><br>'
      });

      socket.on('left_chat',function(data){
         document.getElementById('container').innerHTML += '<b>' + data + ' left the chat</b>';
         document.getElementById('container').innerHTML += '<br><br>'
      })

      socket.on('joined',function(data){
         document.getElementById('container').innerHTML += '<b>'+data+'</b>';
         document.getElementById('container').innerHTML += '<br><br>'
      })
      