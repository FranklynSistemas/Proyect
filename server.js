// server.js
var cons  = require("consolidate");
var express        = require('express');
var app            = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
//var Raspi = require("raspi-io");
httpServer.listen(3000);
var io= require('socket.io').listen(httpServer);

io.set('log level',1);
//var routes = require('./routes/rutas');
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));



app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/manual', function(req, res, next) {
  res.render('ControlManual');
});

app.get('/video', function(req, res, next) {
  res.render('Video');
});


app.get('/vr', function(req, res, next) {
  res.render('ControlVr');
});

app.get('/auto', function(req, res, next) {
  res.render('Automatico');
});

app.get('/voz', function(req, res, next) {
  res.render('voz'); // Control por Voz
});

app.get("*", function(req, res){
  
  res.status(404).send("Página no encontrada :( en el momento");

});

/*
app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/Video.html');
});

app.get('/video', function(req, res) {
        res.sendFile(__dirname + '/public/Video.html');
});
*/

console.log('Servidor disponible en http://localhost:' + 3000);
var motorA1, motorA2, motorB1,motorB2;
var Distancia = 0,
    DistanciaUser=0, 
    detener = false;

var board = new five.Board({
  //io: new Raspi()
});

board.on("ready", function() {
  motorA1 = new five.Led(9);
  motorA2 = new five.Led(8);
  motorB1 = new five.Led(5);
  motorB2 = new five.Led(4);
  on = new five.Led(13); 
  on.blink();
});

//Socket connection handler
io.on('connection', function (socket) {
       // console.log(socket.id);

        socket.on('motorA1:on', function (data) {
           motorA1.on();
           console.log('MotorA1 ON RECEIVED');
        });

        socket.on('motorA1:off', function (data) {
            motorA1.off();
            console.log('MotorA1 OFF RECEIVED');

        });

        socket.on('motorA2:on', function (data) {
           motorA2.on();
           console.log('Motor A2 ON RECEIVED');
        });

        socket.on('motorA2:off', function (data) {
            motorA2.off();
            console.log('motorA2 OFF RECEIVED');

        });

        socket.on('motorB1:on', function (data) {
           motorB1.on();
           console.log('Motor B1 ON RECEIVED');
        });


        socket.on('motorB1:off', function (data) {
            motorB1.off();
            console.log('Motor B1 OFF RECEIVED');

        });

         socket.on('motorB2:on', function (data) {
           motorB2.on();
           console.log('Motor B2 ON RECEIVED');
        });
                  socket.on('motorB2:off', function (data) {
           motorB2.off();
            console.log('Motor B2 OFF RECEIVED');

        });
        socket.on('newFrame',function(obj){
          //console.log("newFrame rcvd");
          //io.sockets.emit('setFrame',obj);
          socket.broadcast.emit('setFrame',obj)
        });
	 socket.on('Iniciar',function(obj){
          console.log('Datos'+obj);
	  DistanciaUser = obj.Distancia;
          Mover();
	  detener=false;		
        });	
	socket.on('Detener',function(obj){
          Detener();
        });
    });


function Mover(){
  Distancia++;
  motorA2.on();
  motorB1.on();

  setTimeout(function(){
    if(Distancia<DistanciaUser){
      Mover();
    }else{
      motorA2.off();
      motorB1.off();
      motorB2.on();
      setTimeout(function(){Distancia=0;Mover()},1000);
    }
  },1000);
}
function Detener(){
      detener=true;     
      motorA1.off();
      motorA2.off();
      motorB1.off();
      motorB2.off();
}

console.log('Waiting for connection');




