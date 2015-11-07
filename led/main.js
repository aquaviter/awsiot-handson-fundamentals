/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var m      = require('mraa');
var lcd    = require('jsupm_i2clcd');
var upmled = require('jsupm_grove');
var awsIot = require('aws-iot-device-sdk');

// Define paramerters for Shadow
var thingShadows = awsIot.thingShadow({
    keyPath: '../certs/privatekey.pem',
    certPath: '../certs/cert.pem',
    caPath: '../certs/rootca.crt',
    clientId: 'edison_shadow_client',
    region: 'ap-northeast-1'
});

// Initilize devices
var myLED = new upmled.GroveLed(8);
var myLCD = new lcd.Jhd1313m1(6, 0x3E, 0x62);
var clearStr = "                       ";

// Initial state
var defaultState = {"state":{"reported":{"led": "off"}}};
var clientTokenUpdate;
var thingName = 'edison';

// Connect to shadow
thingShadows
.on('connect', function() {
  console.log('connected to awsiot.');
  thingShadows.register('edison');
  clientTokenUpdate = thingShadows.update('edison', defaultState);
});

// Get current status
thingShadows
.on('status', function(thingName, stat, clientToken, stateObject) {
  console.log('received ' + stat + ' on ' + thingName + ': ' + JSON.stringify(stateObject));
});

// Get delta (diff between desired and reported) status
thingShadows
.on('delta', function(thingName, stateObject) {
  console.log('received delta '+' on ' + thingName + ': ' + JSON.stringify(stateObject));
  updatedState = {"state":{"reported":{"led": ""}}};
    
  // Control LED
  if(stateObject.state.led == 'on'){
      
    // Turn on LED
    console.log('======Turn on LED======');
    updatedState.state.reported.led = "on";
    console.log(JSON.stringify(updatedState));
    myLCD.setColor(0, 255, 0);
    myLCD.setCursor(0,0);
    myLCD.write(clearStr);
    myLCD.setCursor(0,0);
    myLCD.write("TURNED ON");        
    myLED.on();
      
    clientTokenUpdate = thingShadows.update(thingName, updatedState);
    console.log('========================\n\n');
      
  }else{
      
    // Turn off LED
    console.log('======Turn off LED======');
    updatedState.state.reported.led = "off";
    console.log(JSON.stringify(updatedState));
    myLCD.setColor(0, 255, 0);
    myLCD.setCursor(0,0);
    myLCD.write(clearStr);
    myLCD.setCursor(0,0);
    myLCD.write("TURNED OFF");      
    myLED.off();
    clientTokenUpdate = thingShadows.update(thingName, updatedState);
    console.log('========================\n\n');
    
  }

});
