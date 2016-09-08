//The Scene object constructor
var scene = new THREE.Scene();

var sphere = 0;

//The camera object constructor
//It takes three arguments. 
//fov — Camera frustum vertical field of view.
//aspect — Camera frustum aspect ratio.
//near — Camera frustum near plane.
//far — Camera frustum far plane. 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

//The renderer constructor
var renderer = new THREE.WebGLRenderer();
//Set the size of the renderer to the size of the window
renderer.setSize(window.innerWidth, window.innerHeight);
//Set the background of the scene to white. 
scene.background = new THREE.Color( 0xFFFFFF );

//Set the texture
var texture = new THREE.TextureLoader().load( 'textures/log3.png' );

/****Camera Rotation Script****/
controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
/******************************/

//Get that renderer in the DOM
document.body.appendChild(renderer.domElement);

var addLights = function() {
	//LIGHTS!!!
	var ambientLight = new THREE.AmbientLight( 0x000000 );
	scene.add( ambientLight );

	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );

	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );
}
addLights();

var addSphere = function() {
	//Construct the sphere geometry with SphereGeometry
	//Arguments: 
	//Radius
	//widthSegments
	//HeightSegments
	var geometry = new THREE.SphereGeometry(2, 32, 32);

	//Add a basic material
	//var material = new THREE.MeshNormalMaterial( {color: 0x0054A6} );
	var material = new THREE.MeshPhongMaterial( {
						color: 0xFFFFFF,
						emissive: 0x072534,
						side: THREE.DoubleSide,
						shading: THREE.FlatShading,
						map: texture
					});

	//Create the Mesh
	sphere = new THREE.Mesh( geometry, material );

	//Add Sphere to Scene
	scene.add( sphere );
}
addSphere();

//Move camera
camera.position.z = 7;


//Listen for window resizing
window.addEventListener( 'resize', onWindowResize, false );
//The function for changing the dimensions of the projection if 
//the window is resized. 
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function rotateSphere() {
	//sphere.rotation.x += 0.01;
	sphere.rotation.y -= 0.02;
}

function render() {
	requestAnimationFrame(render);

	/*sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;*/

	rotateSphere();

	renderer.render(scene, camera);
	camera.lookAt( scene.position );
}
//Call render function
render();