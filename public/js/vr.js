var websocket = io.connect("");
var elem = document.getElementById("contenido");

elem.addEventListener('click', fullscreen, false);

function fullscreen(){
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}


}



window.ondevicemotion = function(e) {

	if(e.accelerationIncludingGravity.x < 6){
		//document.getElementById("consola").innerHTML = "Valor x negativo "+e.accelerationIncludingGravity.x;
		document.getElementById("direccionLeft").innerHTML = "<b>Adelante</b>";
		document.getElementById("direccionRight").innerHTML = "<b>Adelante</b>";
		//Atras();
		setTimeout(direccion(2),500);
	}else if(e.accelerationIncludingGravity.y > 1){
		//document.getElementById("consola").innerHTML = "Valor y positivo "+e.accelerationIncludingGravity.y;
		document.getElementById("direccionLeft").innerHTML = "<b>Derecha</b>";
		document.getElementById("direccionRight").innerHTML = "<b>Derecha</b>";
		//Derecha();
		setTimeout(direccion(3),500);
	}else if(e.accelerationIncludingGravity.y < 0){
		//document.getElementById("consola").innerHTML = "Valor y negativo "+e.accelerationIncludingGravity.y;
		document.getElementById("direccionLeft").innerHTML = "<b>Izquierda</b>";
		document.getElementById("direccionRight").innerHTML = "<b>Izquierda</b>";
		//Izquierda();
		setTimeout(direccion(4),500);
	}else if(e.accelerationIncludingGravity.x > 8){
		//document.getElementById("consola").innerHTML = "Valor x positivo "+e.accelerationIncludingGravity.x;
		document.getElementById("direccionLeft").innerHTML = "<b>Detener</b>";
		document.getElementById("direccionRight").innerHTML = "<b>Detener</b>";
		//Adelante();
		setTimeout(direccion(1),500);
	}

}	
var direction = 0;

var direccion = function(dir){
	if(direction === 0){
		direction = dir;
	}else if(direction !== dir){
		var info = " direccion = "+direction+" dirDispo = "+dir;
		websocket.emit('console',info);
		switch(dir){
			case 1:
				Adelante();
				direction = dir;
			break;
			case 2:
				Atras();
				direction = dir;
			break;
			case 3:
				Derecha();
				direction = dir;
			break;
			case 4:
				Izquierda();
				direction = dir;
			break;
		}
	}

}

var IdAdelante = IdAtras = IdDerecha = IdIzquierda = false;

		var Adelante = function(){
			SinMovimiento();
			IdAdelante = !IdAdelante;
			IdAtras = IdDerecha = IdIzquierda = false;
           	console.log('Adelante');
           	if(IdAdelante){
           		//websocket.emit('motorA2:on');
           		//websocket.emit('motorB1:on');
           	}
        }

   		var Atras = function(){
   			SinMovimiento();
           console.log('Atras');
           IdAtras = !IdAtras;
		   IdAdelante = IdDerecha = IdIzquierda = false;
		   if(IdAtras){
           websocket.emit('motorA2:on');
           websocket.emit('motorB1:on');
       	   }
        }

        var Izquierda = function(){
        	SinMovimiento();
           console.log('Izquierda');
           IdIzquierda = !IdIzquierda;
		   IdAdelante = IdDerecha = IdAtras = false;
		   	if(IdIzquierda){
	           websocket.emit('motorB1:on');
	           websocket.emit('motorA1:on');
       		}
        }

        var Derecha = function(){
        	SinMovimiento();
           	console.log('Derecha');
      		IdDerecha = !IdDerecha;
		   	IdAdelante = IdIzquierda = IdAtras = false;
           	if(IdDerecha){
	           	websocket.emit('motorB2:on');
	           	websocket.emit('motorA2:on');
	        }
        }

        var SinMovimiento = function(){
           console.log('SinMovimiento');
           websocket.emit('motorA1:off');
           websocket.emit('motorA2:off');
           websocket.emit('motorB1:off');
           websocket.emit('motorB2:off'); 
        }



