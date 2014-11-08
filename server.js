var WebSocketServer = require('ws').Server,
    _ = require('underscore'),
    wss = new WebSocketServer({
        port: 8080
    });

var Client = require('./server/client');
var Router = require("./server/router")();
var clients = [];
var host = null;

wss.on('connection', function(ws) {
    console.log("connected clients", wss.clients.length);

    var client = new Client(ws)
    clients.push(client);

    // parse a message and send it on to the router
    ws.on('message', function(message) {
    	var obj = {};
    	try{
    		obj = JSON.parse(message);
    	}
    	catch(ex){
    		console.log("ERR PARSING JSON", ex);
    	}

    	// send the message along to the router for processing
    	if (_.isString(obj.msgType)){

            if (obj.msgType === "setClientDeviceType" && obj.data.deviceType==="host"){
                console.log("setting host");
                host = client;
            }

	    	if (_.isFunction(Router[obj.msgType])){
	    		Router[obj.msgType](client, obj.data, host);
	    	}
    	}
    	else{
    		console.log("ERR PARSE JSON", obj);
    	}
    });

    ws.send("You've connected");
});

// broadcast to all clients
wss.broadcast = function(data){
	for (var i in this.clients){
		this.clients[i].send(data);
	}
};