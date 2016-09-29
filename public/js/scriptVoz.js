$(function() {
	var websocket = io.connect();
	var voice = $(document).recognitionVoice();
	var direccion = $("#direccion");
    if(voice.support)
    {
		$("#mic").show().on("vmousedown",function(){
			$(this).addClass('reconoce');
			voice.newRecognition(function(text)
            {
                //funcion mover
                console.log("Inicia: "+text);
                acciones(text);
                $("#mic").removeClass('reconoce');
            });
		});

		$("#mic").show().on("vmouseup",function(){
			//voice.detener();
            //$("#mic").removeClass('reconoce');
            voice.newRecognition(function(text)
            {
                //funcion mover
                console.log("Fin: "+text);
                acciones(text);
                $("#mic").removeClass('reconoce');
            });
		});
    }

    function acciones(text){
    	
    	switch(text){
    		case "Adelante":
    			console.log("Ire Hacia Adelante");
    			direccion.html("Iré Hacia "+text);
    			Adelante();
    		break;
    		case "Atrás":
    			direccion.html("Iré Hacia "+text);
    			Atras();
    		break;
    		case "Izquierda":
    			direccion.html("Iré Hacia la "+text);
    			Izquierda();
    		break;
    		case "Derecha":
    			direccion.html("Iré Hacia la "+text);
    			Derecha();
    		break;
    		case "Detener":
    			direccion.html("Me Detendre");
    			SinMovimiento();
    		break;
    		default:
    			direccion.html("La direccion '"+text+"' No es valida, Las Opciones validas son: Adelante, Atrás, Izquierda, Derecha y Detener");
    		break;
    	}
    }

    	var Adelante = function(){
			SinMovimiento();
           	websocket.emit('motorA2:on');
           	websocket.emit('motorB1:on');
        }

   		var Atras = function(){
   			SinMovimiento();
           	websocket.emit('motorA1:on');
           	websocket.emit('motorB2:on');
        }

        var Izquierda = function(){
	        SinMovimiento();
	        websocket.emit('motorB1:on');
	        websocket.emit('motorA1:on');
        }

        var Derecha = function(){
        	SinMovimiento();
	        websocket.emit('motorA2:on');
	        websocket.emit('motorB2:on');
        }

        var SinMovimiento = function(){
           websocket.emit('motorA1:off');
           websocket.emit('motorA2:off');
           websocket.emit('motorB1:off');
           websocket.emit('motorB2:off'); 
        }


});
