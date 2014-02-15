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
 
});

controller.on('frame', function() {
  // your code here
  
  // console.log('abc');
});

  
controller.connect();

var x=new Array();
var gestureState=0;
x[0]=0;
x[1]=0;

Leap.loop({enableGestures: true}, function(frame){
  // console.log(frame.fingers.length);
     // if (frame.fingers[0]) {
     //  x[0] = x[1];
     //  setInterval(function(){},2000);
     //  x[1] = frame.fingers[0].tipPosition[0];
     //  // var y = frame.fingers[0].tipPosition[1];
     //  // var z = frame.fingers[0].tipPosition[2];
     //  // document.open();
     //  if(x[1]-x[0]>20){
     //    console.log("gesture right");
     //  }else if(x[1]-x[0]<-20){
     //    console.log("gesture left");
     //  }
     //  // document.close();
     //  // console.log(x[1]);
     // }

     var i = 0, iz = frame.gestures.length;

     for (; i < iz; ++i) {
        var gesture = frame.gestures[i];

        if (gesture.type === "swipe") {
            switch (gesture.state) {
            case "start":
                if (gestureState === 0) { // avoid chattering
                    gestureState = 1;
                }
                break;
            case "update":
                if (gestureState === 1) { // avoid chattering
                    gestureState = 2;
                }
                break;
            case "stop":
                if (gestureState === 2) { // avoid chattering
                    gestureState = 0;
                    if(gesture.direction[0]>0){
                      console.log("swipe RIGHT");
                    }else{
                      console.log("swipe LEFT");
                    }
                    if(gesture.direction[1]>0){
                      console.log("swipe top")
                    }else{
                      console.log("swipe bottom");
                    }
                }
            }
        }
      }
});

