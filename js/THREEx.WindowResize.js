// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 *
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	var currentResponsiveHeight	= function(){
		var height;
		var padding = 0;
		var elem1 = document.getElementById("canvas-container");
		var compHeight = window.getComputedStyle(elem1, null).getPropertyValue("height");
		height = Math.floor(Number(compHeight.substring(0,compHeight.length-2)));

	  if ($(window).width() > 768) {
	    height = height-padding;
	  } else {
	    height = height-20;
	  }

	  return height;
	}

	var currentResponsiveWidth	= function(){
	  // notify the renderer of the size change
		var width;
		var padding = 50;
		var elem1 = document.getElementById("canvas-container");
		var compWidth = window.getComputedStyle(elem1, null).getPropertyValue("width");
		width = Math.floor(Number(compWidth.substring(0,compWidth.length-2)));

	  if ($(window).width() > 768) {
	    width = width-padding;
	  } else {
	    width = width-20;
	  }

	  return width;
	}

	var adjustSize	= function(){
		// notify the renderer of the size change

	  var width = currentResponsiveWidth();
	  var height = currentResponsiveHeight();;
		renderer.setSize( width, height );
		// update the camera
		camera.aspect	= width / height;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', adjustSize, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		adjustSize : adjustSize,
		stop	: function(){
			window.removeEventListener('resize', adjustSize);
		}
	};
}
