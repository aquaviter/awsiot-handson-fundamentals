/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var m      = require('mraa');
var lcd    = require('jsupm_i2clcd');                                                                                                         
var awsIot = require('aws-iot-device-sdk');                                                                                                   
var moment = require('moment');                                                                                                               

var topic = 'edison/illuminance';                                                                                                             

// Define paramerters to publish a message                                                                                                     
var device = awsIot.device({
    keyPath: '/home/root/.node_app_slot/certs/privatekey.pem',
    certPath: '/home/root/.node_app_slot/certs/cert.pem',
    caPath: '/home/root/.node_app_slot/certs/rootca.crt',
    clientId: 'edison_pub_client',
    region: 'ap-northeast-1'                                                                                                                   
});    

// Initialize sensors and devices                                                                                                             
var analogPin0 = new m.Aio(0);
var myLCD      = new lcd.Jhd1313m1(6, 0x3E, 0x62);
var clearStr   = "                         ";

device.on('connect', function() {
    console.log('Connected to Message Broker.');
    
    // Loop every 1 sec
    setInterval(function() {
        
        // Retrieve sensor data
        var value = analogPin0.read();
        
        // Display sensed analog data on LCD
        myLCD.setColor(0, 255, 0);
        myLCD.setCursor(0,0);
        myLCD.write(clearStr);
        myLCD.setCursor(0,0);
        myLCD.write("DATA: " + value);        
        
        // Compose records
        var record = {
            "timestamp": moment().toISOString(),   // ISO8601 format
            "value": value
        };
        // Serialize record to JSON format and publish a message
        var message = JSON.stringify(record);
        console.log("Publish: " + message);
        device.publish(topic, message);
    }, 1000);
});                                                
