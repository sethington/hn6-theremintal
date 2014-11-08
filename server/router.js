var _ = require("underscore");

var Router = function(){
	var self = this;
	
	self.setClientDeviceType = function(client, data){
		client.deviceType = data.deviceType;
	};

 	self.setOrientation = function(client, data, host){
		if (_.isObject(host)){
			host.ws.send(JSON.stringify({
				msgType: "orientation",
				data: data
			}));
		}

	};

	return self;
};


module.exports = Router;