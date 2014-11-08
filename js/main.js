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
	/*ws.send("setClientDeviceType",{
		deviceType: type
	});*/

	if (type==='host'){
		HostVisualizer();
		// TODO: fire up visualizer and listen for messages
		var recv = {
			gamma: $("#receiving .gamma"),
			alpha: $("#receiving .alpha"),
			beta: $("#receiving .beta"),
		};
		ws.onMessage = function(msg){
			if (msg.msgType==='orientation'){
				recv.gamma.html(msg.data.gamma);
				recv.alpha.html(msg.data.alpha);
				recv.beta.html(msg.data.beta);
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
