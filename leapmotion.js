// Creating our leap controller
var controller = new Leap.Controller({ enableGestures: true });

// Proving that the websocket is open
controller.on( 'connect' , function(){

  console.log( 'Successfully connected.' );

});

// Proving that a device can be connected
controller.on( 'deviceConnected' , function() {

  console.log('A Leap device has been connected.');

});

// And that it can be disconnected
controller.on( 'deviceDisconnected' , function() {

  console.log( 'A Leap device has been disconnected.' );

});

// When the controller is ready, spawn the unicorn!
controller.on( 'ready' , function(){

  console.log('aaa');
 
});

controller.on('frame', function() {
  // your code here
  
  // console.log('abc');
});

  
controller.connect();

Leap.loop({enableGestures: true}, function(frame){
  // console.log(frame.fingers.length);
     if (frame.fingers[0]) {
      var x = frame.fingers[0].tipPosition[0];
      var y = frame.fingers[0].tipPosition[1];
      var z = frame.fingers[0].tipPosition[2];
      console.log(x);
     }
});

