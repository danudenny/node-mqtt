var mqtt = require('mqtt');
var Topic = 'primasaver/powermeter'; //subscribe to all topics
var Broker_URL = 'mqtt://183.91.67.210';
var Database_URL = '192.168.7.94';

var options = {
	clientId: 'MyMQTT',
    port: 61883,
    username: 'lct1',
    password: 'lct123',
    keepalive : 60
};

var client  = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err) {
    console.log("Reconnect MQTT");
    if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    console.log("Error!");
	if (err) {console.log(err);}
}

function mqtt_close() {
	console.log("Close MQTT");
}

function mqtt_messsageReceived(topic, message, packet) {
    const message_str = JSON.parse(message)
    insert_message(topic, message_str, packet);
};

//Connection to Potgres
var pg = require('pg');
var connectionString = "postgres://primasaver:primasaver@192.168.7.94:5433/psctl";

var pool = new pg.Pool({
    connectionString: connectionString,
})

function insert_message(topic, message_str, packet) {
    const value = [
        Client = message_str.Client,
        Zona = message_str.Zona,
        Kapasitas = message_str.Kapasitas,
        TimeModem = message_str.TimeModem,
        IncomingTime = message_str.IncomingTime, 
        IncomingKWhtot = message_str.IncomingKWhtot, 
        IncomingWBP = message_str.IncomingWBP, 
        IncomingWtot = message_str.IncomingWtot, 
        IncomingLWBP = message_str.IncomingLWBP, 
        IncomingIR = message_str.IncomingIR, 
        IncomingIS = message_str.IncomingIS, 
        IncomingIT = message_str.IncomingIT, 
        IncomingFreq = message_str.IncomingFreq, 
        IncomingVARTot = message_str.IncomingVARTot, 
        IncomingVATot = message_str.IncomingVATot, 
        IncomingVRS = message_str.IncomingVRS, 
        IncomingVST = message_str.IncomingVST, 
        IncomingVTR = message_str.IncomingVTR, 
        IncomingWR = message_str.IncomingWR, 
        IncomingWS = message_str.IncomingWS, 
        IncomingWT = message_str.IncomingWT,
        IncomingVARR = message_str.IncomingVARR, 
        IncomingVARS = message_str.IncomingVARS, 
        IncomingVART = message_str.IncomingVART, 
        IncomingVAR= message_str.IncomingVAR, 
        IncomingVAS = message_str.IncomingVAS, 
        IncomingVAT = message_str.IncomingVAT,
        OutgoingTime = message_str.OutgoingTime, 
        OutgoingKWhtot = message_str.OutgoingKWhtot, 
        OutgoingWtot = message_str.OutgoingWtot, 
        OutgoingWBP = message_str.OutgoingWBP, 
        OutgoingLWBP = message_str.OutgoingLWBP, 
        OutgoingIR = message_str.OutgoingIR, 
        OutgoingIS = message_str.OutgoingIS, 
        OutgoingIT = message_str.OutgoingIT, 
        OutgoingFreq = message_str.OutgoingFreq, 
        OutgoingVARTot = message_str.OutgoingVARTot,
        OutgoingVATot = message_str.OutgoingVATot, 
        OutgoingVRS = message_str.OutgoingVRS, 
        OutgoingVST = message_str.OutgoingVST, 
        OutgoingVTR = message_str.OutgoingVTR, 
        OutgoingWR = message_str.OutgoingWR, 
        OutgoingWS = message_str.OutgoingWS, 
        OutgoingWT = message_str.OutgoingWT, 
        OutgoingVARR = message_str.OutgoingVARR, 
        OutgoingVARS = message_str.OutgoingVARS, 
        OutgoingVART = message_str.OutgoingVART,
        OutgoingVAR= message_str.OutgoingVAR,
        OutgoingVAS = message_str.OutgoingVAS,
        OutgoingVAT = message_str.OutgoingVAT
    ]
    var valuesInsert = "";
    for(var i = 1; i < 51; i += 1) {
        valuesInsert += '$' + i;
        if(i != 50) {
            valuesInsert += ', ';
        } 
    }
    
    pool.query('INSERT INTO mqtt_test(Client, Zona, Kapasitas, TimeModem, IncomingTime,  IncomingKWhtot, IncomingWBP,' +
        'IncomingWtot, IncomingIR, IncomingLWBP, IncomingIS, IncomingIT, IncomingFreq, IncomingVARTot, IncomingVATot,' +
        'IncomingVRS, IncomingVST, IncomingVTR, IncomingWR, IncomingWS, IncomingWT,IncomingVARR, IncomingVARS, IncomingVART,' +
        'IncomingVAR, IncomingVAS, IncomingVAT,OutgoingTime, OutgoingKWhtot, OutgoingWtot, OutgoingWBP, OutgoingLWBP,' +
        'OutgoingIR, OutgoingIS, OutgoingIT, OutgoingFreq, OutgoingVARTot,OutgoingVATot, OutgoingVRS, OutgoingVST,' +
        'OutgoingVTR, OutgoingWR, OutgoingWS, OutgoingWT, OutgoingVARR, OutgoingVARS, OutgoingVART, OutgoingVAR, OutgoingVAS,' +
        'OutgoingVAT) VALUES ('+ valuesInsert +');', value, (err, results) => {
        if (err) {
            console.log(err.stack)
          } else {
            console.log("Inserted to database")
          }
	}); 
};	