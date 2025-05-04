var rotationsModule = (function() {


	function changeSpeed() {

		var duration = document.getElementById("duration").value;
	    document.getElementById("durationDisplay").value = duration + 's';

	    // Fill in the rest of the code to change the dur attributes of the four animations
		var animate = document.getElementById("animation");
		animate.setAttribute("dur", duration + "s");

	}

	return {
        changeSpeed: changeSpeed
    };

})();