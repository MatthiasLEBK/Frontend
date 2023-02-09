window.addEventListener("load", (event) => {
    placeteam = {};

    placeteam.ctx = document.getElementById("pixelcanvas").getContext("2d");
    placeteam.ctx.imageSmoothingEnabled = false;
    placeteam.init = (pixelmap) => {


        
    };
    placeteam.update = (updatedata) => {
        updatedata.data.pixels.forEach((pixel) => {
            placeteam.setPixel(pixel.position.x,pixel.position.y,pixel.color)
        });
    };
    //change pixel locally
    placeteam.setPixel = (x,y,color) => {    
        placeteam.ctx.fillStyle = color;
        placeteam.ctx.fillRect(x, y, 1, 1);
    };
    //change pixel on server
    placeteam.set = (x,y,color) => {
        placeteam.websocket.send({
            "command": "set",
            "key": "5251d829377e9590737d859d04bf3e0e17091e5cd62626c92e7af82d9efc602f",
            "timeStamp": Date.now(),
            "data": {
              "pixel": {
                "color": color,
                "position": {
                  "x": x,
                  "y": y
                }
              }
            }
        });
    }

    // Get coordinates of clicked position on canvas
    function getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect();

      // Gets the coordinates of the clicked position on the canvas, converts them to the pixel coordinates of the canvas,
      // and rounds them down. Oddly enough,  clicking on the very edge of the element can cause it to return numbers that are too
      // high or too low, so we have to clamp it
      const x = Math.floor(Math.max(Math.min(((event.clientX - rect.left) / canvas.clientWidth) * canvas.width, canvas.width - 1), 0));
      const y = Math.floor(Math.max(Math.min(((event.clientY - rect.top)  / canvas.clientWidth) * canvas.height, canvas.height - 1), 0));

      placeteam.setPixel(x, y, '#'+Math.floor(Math.random()*16777215).toString(16));
      console.log("x: " + x + " y: " + y);
    }
  
    const canvas = document.querySelector('.mapcontainer canvas')
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
    });

    canvas.addEventListener('wheel', function(event) {
        console.log(canvas.style.width);

        currentCanvasWidth = parseInt(canvas.style.width.match(/\d/g));
        canvas.style.cssText= 'width: ' + (currentCanvasWidth + Math.sign(event.event.deltaY)) + '%;'
        console.log(event.deltaY);
    })
});