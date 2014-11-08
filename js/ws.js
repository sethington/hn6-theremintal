var WS = function(wsUri){
	var self = this;

	self.ws = new WebSocket(wsUri);

	self.opened = jQuery.Deferred();

	self.onMessage = null;

	self.ws.onopen = function(evt) { 
		console.log("opened", evt);
		self.opened.resolve();
	}; 
	self.ws.onclose = function(evt) { 
		console.log("closed",evt);
	}; 
	self.ws.onmessage = function(evt) { 
		if (typeof(self.onMessage)==='function'){
			self.onMessage(JSON.parse(evt.data));
		}
	}; 
	self.ws.onerror = function(evt) { 
		console.log("error",evt);
	};

	self.send = function(type, msg){
		var obj = {
			msgType: type,
			data: msg
		};
		self.ws.send(JSON.stringify(obj));
	};

	return self;
};