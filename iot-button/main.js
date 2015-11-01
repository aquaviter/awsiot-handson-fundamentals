/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var m           = require('mraa');
var lcd         = require('jsupm_i2clcd');
var groveSensor = require('jsupm_grove');
var moment      = require('moment'); 
var awsIot      = require('aws-iot-device-sdk');

var topic = 'edison/button';

var device = awsIot.device({
    keyPath: '/home/root/.node_app_slot/certs/privatekey.pem',
    certPath: '/home/root/.node_app_slot/certs/cert.pem',
    caPath: '/home/root/.node_app_slot/certs/rootca.crt',
    clientId: 'edison_iot_button',
    region: 'ap-northeast-1'                                                                                                                   
});   

// Initilize LCD
var myLCD = new lcd.Jhd1313m1(6, 0x3E, 0x62);
var clearStr = "                       ";

// Create the button object using D4
var button = new groveSensor.GroveButton(4);

device.on('connect', function() {
    console.log('Connected to Message Broker.');
    
    // Loop every 1 sec
    setInterval(function() {
        
        var name  = button.name();
        var value = button.value();
        
        // Display sensed analog data on LCD
        myLCD.setColor(0, 255, 0);
        myLCD.setCursor(0,0);
        myLCD.write(clearStr);
        myLCD.setCursor(0,0);
        
        console.log(name + " value is " + value);
        
        if(value == 1){
            // If button is pressed...
            console.log("Button is OFF");
            myLCD.write('ON');
            // Compose records
            var record = {
                "timestamp": moment().toISOString(),
                "value": "on"
            };
            // Serialize record to JSON format and publish a message
            var message = JSON.stringify(record);
            console.log("Publish: " + message);
            device.publish(topic, message);
        }else{
            // If button is not pressed...
            console.log("Button is OFF");
            myLCD.write("OFF");
        }
    }, 1000);
});                                         