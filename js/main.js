var ws = new WS("ws://172.31.253.10:8080/");
var sendr = {};

$(document).ready(function(){
	ws.opened.then(function(){
		ws.send("setClientDeviceType",{
			deviceType: "host"
		});
	});

	sendr = {
		gamma: $("#sending .gamma"),
		alpha: $("#sending .alpha"),
		beta: $("#sending .beta"),
	};
});

// set the device type so we know whether we're processing 
function setType(type){
	if (type==='host'){
		// fire up visualizer
		HostVisualizer();
		
		// listen for messages and plug them in
		var recv = {};
		ws.onMessage = function(msg){
			if (!_.isObject(recv[msg.clientId])){
				var obj = $("#receiving .cloneme").clone()
					.addClass(msg.clientId+ " clonee")
					.removeClass("cloneme")
					.prepend("<h4>Client:"+msg.clientId+"</h4>");

				recv[msg.clientId] = {
					gamma: obj.find(".gamma"),
					beta: obj.find(".beta"),
					alpha: obj.find(".alpha")
				};
				$("#receiving").append(obj);
			}

			if (msg.msgType==='orientation'){
				recv[msg.clientId].gamma.html(msg.data.gamma);
				recv[msg.clientId].alpha.html(msg.data.alpha);
				recv[msg.clientId].beta.html(msg.data.beta);
			}
		};
	}
	else{
		if (window.DeviceOrientationEvent) {

			var debounce = _.debounce(function(evt){
				console.log("deb");
				deviceOrientationHandler(evt);
			}, 50, true);

			window.addEventListener('deviceorientation', debounce, false);
		}
	}
}


function deviceOrientationHandler(evt){
	sendr.gamma.html(evt.gamma);
	sendr.alpha.html(evt.alpha);
	sendr.beta.html(evt.beta);
	if (ws.ws.readyState === 1){
		ws.send("setOrientation",{
			gamma: evt.gamma,
			beta: evt.beta,
			alpha: evt.alpha
		});
	}
}
