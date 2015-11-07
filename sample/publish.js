var awsIot = require('aws-iot-device-sdk');
var moment = require('moment');

var topic = 'edison/illuminance';

// Define paramerters to publish a message
var device = awsIot.device({
   keyPath: '../certs/privkey.pem',
  certPath: '../certs/cert.pem',
    caPath: '../certs/rootca.crt',
  clientId: 'edison_sample_pub',
    region: 'ap-northeast-1'
});

device
  .on('connect', function() {
    console.log('Connected to Message Broker.');

    // Loop every 1 sec
    setInterval(function() {
      // Compose records
      var record = {
        "device": "edison",
        "sensor": "illuminance",
        //"timestamp": (new Date).getTime()/1000|0, // epoch time
        "timestamp": moment().toISOString(),
        "value": Math.floor(Math.random() * (100 - 0 + 1) + 0) // ramdom value 0~100
      };

      // Serialize record to JSON format and publish a message
      var message = JSON.stringify(record);
      console.log("Publish: " + message);
      device.publish(topic, message);

  }, 1000);

  });
