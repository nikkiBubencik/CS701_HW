var animModule = (function() {

    window.onload = init;

    var canvas;
    var context;
    var width, height;

    var ballRadius = 10; 
    var ballColor = "blue";
    var ballPosition;
    var angle = 0;
    
    // displacement of ball for each step
    var dx = 5;
        
    function init() {
        
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext('2d');
        
        width = canvas.width;
        height = canvas.height;
        
        // current ball position
        ballPosition = {x : ballRadius, y : ballRadius + 5};
    }
      
    function setSpeed(speed) {

        let newSpeed = +speed;
        if (dx > 0)
            dx = newSpeed
        else
            dx =  -newSpeed;
    } 

    // draw current position on the canvas
    function drawBallOnCanvas() {

        // Clear the canvas

        context.fillStyle = '#D3C0C0';
        context.fillRect(0, 0, canvas.width, canvas.height);    
       
        // Fill in the rest of the code
        drawBoard();
        //determine ball color based on speed
        if(dx < 0){
            context.fillStyle = "red";
            context.fill();
        }
        else{
            context.fillStyle = "blue";
            context.fill();
        }
        ballPosition.x += dx;
     
        //draw ball
        context.beginPath();
        context.arc(ballPosition.x, ballPosition.y, ballRadius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        
        // edge cases 
        //ball reached end
        if (ballPosition.y + ballRadius + 5 > canvas.height) {
            ballPosition.y = ballRadius + 5;
        }
        else if (ballPosition.x + ballRadius > canvas.width || ballPosition.x - ballRadius < 0) {
            // ball hit a side
            ballPosition.y += 2 * ballRadius + 5;
            dx = -dx;
        } 
        
    }

    function drawBoard(){
        // distance between lines
        let ballSize = 2 * ballRadius + 5
        let x = ballSize;

        let left = true;
        context.strokeStyle= "black";
        context.lineWidth = 2;

        // draw lines on board
        while(x <= canvas.height){
            context.beginPath()
            if(left){
                context.moveTo(0, x);
                context.lineTo(canvas.width - ballSize, x);
                left = false;
            }
            else{
                context.moveTo(ballSize, x);
                context.lineTo(canvas.width, x);
                left = true;
            }
            context.stroke();
            context.closePath();
            x += ballSize;
        }
    }
        

    // browser specific animation request
     window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  // fall back to JavaScript setTimeout
                  function(callback, element){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();
            
        // Define the Animation
        function doAnimation() {
            // Draw a single frame of animation on our canvas
            drawBallOnCanvas();

            // After this frame is drawn, let the browser schedule the next one

            window.requestAnimFrame(doAnimation);
        }

        // Start the Animation
            
         window.requestAnimFrame(doAnimation);

         return {
            setSpeed: setSpeed
         }
    

})();












