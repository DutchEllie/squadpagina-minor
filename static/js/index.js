var spinDeg = 0;
var spinSpeed = 0;
var resistance = 0.1;
var FRICTION_COEFF = 0.85;
var dragging = false;
var mouse = { x: 0 , y: 0 };
var position = { x: 0 , y: 0 };
var previous = { x: position.x , y: position.y };
var velocity = { x: 0 , y: 0 };

const spinner = document.getElementById("spinner");
console.log(spinDeg)

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

function loop() {
	// Handle dragging

		previous.x = position.x;
		previous.y = position.y;
		position.x = mouse.x;
		position.y = mouse.y;

	if(dragging) {
		velocity.x = ( position.x - previous.x );
		velocity.y = ( position.y - previous.y );
	} else {
		position.x += velocity.x;
		position.y += velocity.y;
		
		velocity.x *= FRICTION_COEFF;
		velocity.y *= FRICTION_COEFF;
	}


	// Calculate speed
	if (spinSpeed < 0.1) {
		spinSpeed = 0;
	}

	spinSpeed += velocity.y * 0.01;
	if (spinSpeed > 10) {
		spinSpeed = 10;
	}
	spinDeg += spinSpeed;
	spinSpeed -= resistance;
	spinner.style.transform = `rotate(${spinDeg}deg)`;

	// Call the function again
	requestAnimationFrame(loop)
}

loop();