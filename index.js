var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/turnero', function(req, res){
  res.sendFile(__dirname + '/view/menu.html');
});
app.get('/emisor', function(req, res){
  res.sendFile(__dirname + '/view/emisor.html');
});
app.get('/llamador', function(req, res){
  res.sendFile(__dirname + '/view/llamador.html');
});
app.get('/visor', function(req, res){
  res.sendFile(__dirname + '/view/visor.html');
});

io.on('connection', function (socket){
  console.log('Se ha conectado un usuario.');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('call', function (msg) {
    console.log(`se emitio el evento call y su msg es: ${msg}`)
    io.emit('call', msg)  
  })
  socket.on('disconnect', function(){
    console.log('El usuario se ha desconectado');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
