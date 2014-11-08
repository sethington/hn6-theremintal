var Client = function(wsClient){
	var self = this;
	self.ws = wsClient;
	self.deviceType = "guest";
	return self;
};

module.exports = Client;