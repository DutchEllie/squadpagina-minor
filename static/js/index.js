var spinDeg = 0;
var spinSpeed = 0;
var resistance = 0.1;
var FRICTION_COEFF = 0.85;
var dragging = false;
var scrolling = false;
var mouse = { x: 0 , y: 0 };
var position = { x: 0 , y: 0 };
var scrollDelta = { x: 0, y: 0 };
var previousScrollDelta = { x: 0, y: 0 };
var previous = { x: position.x , y: position.y };
var velocity = { x: 0 , y: 0 };

const spinner = document.getElementById("spinner");
const spinnables = document.querySelectorAll("[id='spinnable']")

window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function( callback ){
						window.setTimeout(callback, 1000 / 60);
				};
})();

//spinner.addEventListener("click", () => {
//	spinSpeed += 5;
//}, false);

spinner.addEventListener("mousedown", () => { dragging = true; });
document.addEventListener("mouseup", () => { dragging = false; });
document.addEventListener("mousemove", (ev) => { 
	mouse.x = ev.x;
	mouse.y = ev.y;
});
// spinner.addEventListener("wheel", (ev) => {
// 	scrollDelta.x += ev.deltaX;
// 	scrollDelta.y += ev.deltaY;

// })

function loop() {
	// Handle dragging

	// Track the position of the mouse always
	// This way we always have the current and previous position of the mouse
	// Using that we can calculate it's speed by substracting the two
	previous.x = position.x;
	previous.y = position.y;
	position.x = mouse.x;
	position.y = mouse.y;
	// previousScrollDelta.x = scrollDelta.x;
	// previousScrollDelta.y = scrollDelta.y;

	// velocity.x = scrollDelta.x;
	// velocity.y = scrollDelta.y;
	//console.log(scrollDelta.y)
	if(dragging) {
		// We only calculate the velocity if we get a dragging event
		velocity.x = ( position.x - previous.x );
		velocity.y = ( position.y - previous.y );
	} else {
		// Idk what this does, I copied it from some website
		position.x += velocity.x;
		position.y += velocity.y;
		velocity.x *= FRICTION_COEFF;
		velocity.y *= FRICTION_COEFF;
	}

	// Calculate speed
	// Here we set the spinspeed to a minimum
	if (spinSpeed < 0.1) {
		spinSpeed = 0;
	}

	// Spinspeed is the velocity times a factor
	// Also limit the spinspeed. We could otherwise get it spinning to ridiculous speeds
	spinSpeed += velocity.y * 0.01;
	if (spinSpeed > 10) {
		spinSpeed = 9.9;
	}
	// The degrees is itself plus spinspeed
	// The spinspeed is itself minus resistance
	// Then set the rotation to the spindegrees
	const lastSpinDeg = spinDeg;
	spinDeg += spinSpeed;
	spinSpeed -= resistance;
	spinner.style.transform = `rotate(${spinDeg}deg)`;
	spinnables.forEach((elem) => {
		elem.style.transform = `rotate(${spinDeg * -1}deg)`
	})
	positionSpinables()

	// BROKEN RIGHT NOW
	// TODO: Fix this function
	// For every time the spinDeg crosses 90 degrees we change the spinnables
	// if(spinDeg - lastSpinDeg) {
	// 	const lastSpinnableHTML = spinnables[2].innerHTML;
	// 	spinnables[2].innerHTML = spinnables[1].innerHTML;
	// 	spinnables[1].innerHTML = spinnables[0].innerHTML;
	// 	spinnables[0].innerHTML = lastSpinnableHTML;
	// }

	// Call the function again
	requestAnimationFrame(loop)
}

function positionSpinables() {
	var count = 0;
	spinnables.forEach((elem) => {
		switch (count) {
			case 0:
				elem.style.top = 0;
				elem.style.right = 0;
				count++;
				break;
			case 1:
				elem.style.right = 0;
				elem.style.top = "50%"
				count++;
				break;
			case 2: 
				elem.style.bottom = 0;
				elem.style.right = 0;
				count++;
				break;
		}
	})
}

loop();