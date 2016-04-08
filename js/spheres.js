
	function sphere() {


			var space;
			var camera, scene, renderer;
			var raycaster;
			var mouse;
			var PI2 = Math.PI * 2;
			var INTERSECTED;
			var targetList = [];
			var projector, mouse = { x: 0, y: 0 };
			var selectedFaces = [];
			var floorSide=1000;
			var baseColor=new THREE.Color( 0x44dd66 );
			var highlightedColor=new THREE.Color( 0xddaa00 );
			var selectedColor=new THREE.Color( 0x4466dd );
			var mouseSphereCoords = null;
			var mouseSphere=[];

			//finding intersections


			//end


			space = document.createElement( 'div' );
			space.style.position = 'absolute';
			var container = document.getElementById('three');
			container.appendChild( space );


			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, three.clientWidth/three.clientHeight, 0.1, 1000 );

			renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setSize( three.clientWidth, three.clientHeight);
			//document.body.appendChild( renderer.domElement );

			space.appendChild( renderer.domElement );


			// for(var i = 0; i < 20; i++) {
			// 	var geometry = new THREE.SphereGeometry( 20, 20, 20 );
			// 	var material = new THREE.MeshLambertMaterial( {color: Math.random() * 0x808080 + 0x808080,} );
			// 	var sphere = new THREE.Mesh( geometry, material );
			// 	sphere.position.y = Math.random()*250 - 125;
			// 	sphere.position.x = Math.random()*400 - 200;
			// 	sphere.position.z = Math.random()*200 - 100;
			// 	scene.add( sphere );

			// }
			//adding stuff
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2();
			//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );

			//end

			addOcta();

			var pointLight =
			  new THREE.PointLight(0xFFFFFF, 5);

			// set its position
			pointLight.position.x = 20;
			pointLight.position.y = 50;
			pointLight.position.z = 130;

			// add to the scene
			scene.add(pointLight);


			var pointLight2 =
			  new THREE.PointLight(0xFFFFFF);

			// set its position
			pointLight2.position.x = -20;
			pointLight2.position.y = -50;
			pointLight2.position.z = -130;

			// add to the scene
			scene.add(pointLight2);

			camera.position.z = 200;
			window.addEventListener( 'resize', onWindowResize, false );


			function addOcta()
			{
				var cubeSide = 100;


				var faceColorMaterial = new THREE.MeshLambertMaterial(
				{ color: 0xffffff, vertexColors: THREE.FaceColors,polygonOffset: true,polygonOffsetUnits: 1,polygonOffsetFactor: 1} );

				var octaGeom= new THREE.OctahedronGeometry(cubeSide,0);
				for ( var i = 0; i < octaGeom.faces.length; i++ )
				{
					face = octaGeom.faces[ i ];
					face.color= baseColor;
				}
				var octa= new THREE.Mesh( octaGeom, faceColorMaterial );
				octa.position.set(0, 0, 0);
				// creates a wireMesh object
				wireOcta = new THREE.Mesh(octaGeom, new THREE.MeshBasicMaterial({ color: 0x116611, wireframe: true }));

				scene.add(octa);
				// wireMesh object is added to the original as a sub-object
				octa.add(wireOcta );

				targetList.push(octa);
			}

			function onWindowResize() {
				camera.aspect = three.clientWidth/three.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( three.clientWidth, three.clientHeight );
			}

			//more stuff
				function onDocumentMouseDown( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( targetList );
				// if ( intersects.length > 0 ) {
				// 	if ( INTERSECTED != intersects[ 0 ].object ) {

				// 		if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
				// 		INTERSECTED = intersects[ 0 ].object;
				// 		INTERSECTED.material.color.setHex(0xff0000);
				// 	}
				// } else {
				// 	if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
				// 	INTERSECTED = null;
				// }


				if ( intersects.length > 0 )
				{	// case if mouse is not currently over an object
					alert(intersects.length);
					if(INTERSECTED==null){
						INTERSECTED = intersects[ 0 ];
						INTERSECTED.face.color = highlightedColor;
					}
					else{	// if thse mouse is over an object
						INTERSECTED.face.color= baseColor;
						INTERSECTED.object.geometry.colorsNeedUpdate=true;
						INTERSECTED = intersects[ 0 ];
						INTERSECTED.face.color = highlightedColor;
					}
					// upsdate mouseSphere coordinates and update colors
					//mouseSphereCoords = [INTERSECTED.point.x,INTERSECTED.point.y,INTERSECTED.point.z];
					INTERSECTED.object.geometry.colorsNeedUpdate=true;

				}
				else // there are no intersections
				{
					// restore previous intersection object (if it exists) to its original color
					if ( INTERSECTED ){
						INTERSECTED.face.color = baseColor;
						INTERSECTED.object.geometry.colorsNeedUpdate=true;
					}
				}
			}

			//


			var radius = 300;
			var theta = 0;


			var render = function () {

				// theta += 0.1;
				// camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				// camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				// camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				// camera.lookAt( scene.position );
				// camera.updateMatrixWorld();




				requestAnimationFrame( render );


				//casting rays

				// raycaster.setFromCamera( mouse, camera );
				// var intersects = raycaster.intersectObjects( scene.children );
				// if ( intersects.length > 0 ) {
				// 	if ( INTERSECTED != intersects[ 0 ].object ) {

				// 		if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
				// 		INTERSECTED = intersects[ 0 ].object;
				// 		INTERSECTED.material.color.setHex(0xff0000);
				// 	}
				// } else {
				// 	if ( INTERSECTED ) INTERSECTED.material.color.setHex(Math.random() * 0x808080 + 0x808080);
				// 	INTERSECTED = null;
				// }


				//end of casting rays



				renderer.render(scene, camera);


			};

			render();
	}

	sphere();



