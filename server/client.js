var Client = function(wsClient){
	var self = this;
	self.id = Math.random().toString(36);
	self.ws = wsClient;
	self.deviceType = "guest";
	return self;
};

module.exports = Client;