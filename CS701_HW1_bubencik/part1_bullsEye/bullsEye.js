var bullsEyeModule = (function() {

    window.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;

    var delay = false;

    // Interval
    var timerId;

    function init() {
        
            canvas = document.getElementById("testCanvas");
            context = canvas.getContext("2d");

            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            
            // draw the initial pattern
            drawPattern();
    }


    // called whenever the slider value changes or the delay checkbox is clicked
    function drawPattern()
    {
        if (timerId) {
            clearInterval(timerId);
            timerId = undefined;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        var bandWidth = document.getElementById("band").value;
        document.getElementById("widthDisplay").value = bandWidth;

        delay = document.getElementById("delay").checked;
        
        // Fill in the rest of the code
        // max circle radius
        let radius = canvas.width / 2;
        let red = true;

        function drawCircle(radius){
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }

        timerId = delay ? 1500 : 0;
        setInterval(function () {
            if (radius <= 0){
                clearInterval(timerId);
            }
            if(red){ // alternate colors
                context.fillStyle = "red";
                red = false;
            }
            else{
                context.fillStyle = "blue";
                red = true;
            }
            drawCircle(radius);
            // determine radius for next circle
            radius -= bandWidth;
            }
            , timerId);   
        
    }



    return {
        drawPattern: drawPattern
    };

})();






