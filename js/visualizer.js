var HostVisualizer = function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
	scene.add(camera);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	$(".visualizer").append(renderer.domElement);

	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});

	var cube = new THREE.Mesh(geometry, material);
	//scene.add(cube);

	var sphereMaterial = new THREE.MeshLambertMaterial({
		color: 0xCC0000
	});

	var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(50,16,16),
			sphereMaterial
		);
	scene.add(sphere);

	var sphere2 = new THREE.Mesh(
			new THREE.SphereGeometry(50,16,16),
			sphereMaterial
		);
	scene.add(sphere2);
	sphere2.position.x = 125;
	sphere2.position.y = 75;
	sphere2.position.z = -150;


	var sphere3 = new THREE.Mesh(
			new THREE.SphereGeometry(50,16,16),
			sphereMaterial
		);
	scene.add(sphere3);
	sphere3.position.x = -125;
	sphere3.position.y = -75;
	sphere3.position.z = -150;

	camera.position.z = 300;

	var pointLight = new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

	render();

	function render() {
		requestAnimationFrame(render);

	//	cube.rotation.x += 0.01;
	//	cube.rotation.y += 0.01;
		sphere2.position.y -= 0.1;
		sphere2.position.z += 0.1;

		sphere3.position.y += 0.1;
		sphere3.position.z -= 0.1;

		renderer.render(scene, camera);
	}

	window.addEventListener('resize', function() {
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});
}