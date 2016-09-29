var app = angular.module('myApp', ['btford.socket-io']).
    factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
    controller('ArduController', function ($scope,mySocket) {

      $scope.touched = false;

      $scope.touchStart = function() {
        $scope.touched = true;
      }

      $scope.touchEnd = function() {
        $scope.touched = false;
      }

        $scope.Adelante = function(){
           console.log('Adelante');
           Vibrar();
           mySocket.emit('motorA2:on');
           mySocket.emit('motorB1:on');
        }

        $scope.Atras = function(){
           console.log('Atras');
           Vibrar();
          
           mySocket.emit('motorA1:on');
           mySocket.emit('motorB2:on');
        }

        $scope.Izquierda = function(){
           console.log('Izquierda');
           Vibrar();
           mySocket.emit('motorB1:on');
           mySocket.emit('motorA1:on');
        }

        $scope.Derecha = function(){
           console.log('Derecha');
           Vibrar();
           mySocket.emit('motorA2:on');
           mySocket.emit('motorB2:on');
        }

        $scope.SinMovimiento = function(){
           console.log('SinMovimiento');
           StopVibrar();
           mySocket.emit('motorA1:off');
           mySocket.emit('motorA2:off');
           mySocket.emit('motorB1:off');
           mySocket.emit('motorB2:off'); 
        }



}).directive('myTouchstart', [function() {
                return function(scope, element, attr) {

                    element.on('touchstart', function(event) {
                        scope.$apply(function() { 
                            scope.$eval(attr.myTouchstart); 
                        });
                    });
                };
            }]).directive('myTouchend', [function() {
                return function(scope, element, attr) {

                    element.on('touchend', function(event) {
                        scope.$apply(function() { 
                            scope.$eval(attr.myTouchend); 
                        });
                    });
                };
            }]).controller('indexController', function ($scope,mySocket) {

            }).controller('AutController', function ($rootScope,$scope,$interval,mySocket) {
              $scope.data = {};
              $scope.boton = false;
              $scope.tiempo = 00;
              
              $scope.Iniciar = function(datos){
                if(datos.Distancia === undefined || datos.Tiempo === undefined){
                  alert("Debe Ingresar todos los datos y Los datos deben estar entre los rangos indicados Distancia <= 100  y Tiempo <= 90");
                }else{
                  console.log(datos);
                  $scope.boton = true;
                  mySocket.emit('Iniciar',datos);
                  $scope.tiempo = datos.Tiempo;
                  ini();
                }
              }

              $scope.Detener = function(){
                $scope.boton = false;
                mySocket.emit('Detener');
                stopini();
              }

             

            var stop;
            var ini = function() {
              // Don't start a new fight if we are already fighting
              if ( angular.isDefined(stop) ) return;
                stop = $interval(function() {
                if ($scope.tiempo > 0 ) {
                  $scope.tiempo = $scope.tiempo - 1;
                  console.log($scope.tiempo);
                } else {
                  stopini();
                }
              }, 1000);
            };

        var stopini = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

            })



