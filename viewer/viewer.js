var awsIot = require('aws-iot-device-sdk');
var moment = require('moment');

var topic = 'edison/illuminance';

var device = awsIot.device({
   keyPath: '../certs/privatekey.pem',
  certPath: '../certs/cert.pem',
    caPath: '../certs/rootca.crt',
  clientId: 'viewer',
    region: 'ap-northeast-1'
});

// Connect to AWS IoT Message Broker
device
  .on('connect', function() {
    device.subscribe(topic);
    });


// Initiate blessed configuration
var blessed = require('blessed')
     , contrib = require('blessed-contrib')
     , screen = blessed.screen()
     , line = contrib.line(
         { style:
           { line: "yellow"
           , text: "green"
           , baseline: "black"}
         , xLabelPadding: 3
         , xPadding: 5
         , label: 'AWS IoT Demo'})
         ,series1 = {
             x: [],
             y: []
         }

screen.append(line)
line.setData(series1);

// Retrieve message from topic and render graph
device
  .on('message', function(topic, payload) {

    //console.log('message', topic, payload.toString());

   // Parse subscribed message
    var data = JSON.parse(payload);
    var timestamp = moment(data.timestamp).format("HH:mm:ss");
    var value = data.value;

    // Keeping array length
      if (series1.length > 20) {
        series1.x.shift();
        series1.y.shift();
    }else{
        series1.x.push(timestamp);
        series1.y.push(value);
    }

    // Render the graph
    line.setData(series1);
    screen.render();
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});
