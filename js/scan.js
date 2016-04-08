var canvas = document.getElementById('canvas');

var renderer = new THREE.WebGLRenderer({canvas: canvas});


canvas.width  = canvas.clientWidth;
canvas.height = canvas.clientHeight;
renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
camera.position.z = 200;

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ color: 0x1C4A8C });
var cube = new THREE.Mesh(geometry, material);

cube.rotation.x += 1;
cube.rotation.y += 2;
scene.add(cube);


var loader = new THREE.STLLoader();
loader.load( './assets/models/test4.stl', function ( geometry ) {

  var material = new THREE.MeshPhongMaterial( { color: 0x335e9d, specular: 0x111111, shininess: 70 } );

  //var material = new THREE.MeshPhongMaterial( { color: 0x335e9d, specular: 0x111111, shininess: 70 } );
  var mesh = new THREE.Mesh( geometry, material );

  mesh.position.set( 0, - 0.25, 0.6 );
  mesh.rotation.set( 0, - Math.PI / 2, 0 );
  mesh.scale.set( 0.5, 0.5, 0.5 );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add( mesh );

} );


var controls;
controls = new THREE.TrackballControls( camera, renderer.domElement );

controls.rotateSpeed = 3.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

controls.keys = [ 65, 83, 68 ];

controls.addEventListener( 'change', render );

var light ;

light = new THREE.DirectionalLight( 0xc9c9c9, 1);
light.position.set( 50, 0, 50 );
scene.add( light );

light = new THREE.DirectionalLight( 0xc9c9c9, 1 );
light.position.set( -50, 0, -50 );
scene.add( light );

light = new THREE.DirectionalLight( 0xc9c9c9, 1);
light.position.set( 0, 50, 0 );
scene.add( light );


light = new THREE.DirectionalLight( 0xc9c9c9, 1.5 );
light.position.set( 0, -50, 0 );
scene.add( light );

light = new THREE.DirectionalLight( 0xc9c9c9, .5);
light.position.set( 50, 50, 50 );
scene.add( light );

light = new THREE.DirectionalLight( 0xc9c9c9, 1 );
light.position.set( 50, 0, -50 );
scene.add( light );



light = new THREE.DirectionalLight( 0xc9c9c9, .5);
light.position.set( -500, -20, 50 );
scene.add( light );



var animate = function () {
  requestAnimationFrame( animate );
  controls.update();


};

var render = function () {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

$( document ).ready(function() {
  renderer.setClearColor( 0xffffff );

  var resizer = THREEx.WindowResize(renderer, camera);
  resizer.adjustSize();

  render();
  animate();

});
