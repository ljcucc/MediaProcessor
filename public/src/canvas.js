(()=>{
  let canvas = document.querySelector("canvas");
  let mousePressed = false;
  let ctx = canvas.getContext("2d");

  // Basic functions

  let getMousePos = (e)=>{ 
    let rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  let drawLine = (ctx, x1, y1, x2, y2)=>{
    ctx.beginPath();       // Start a new path
    ctx.moveTo(x1, y1);    // Move the pen to (30, 50)
    ctx.lineTo(x2, y2);  // Draw a line to (150, 100)
    ctx.stroke();
  }

  let clearCanvas = (ctx)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Program

  // Event handler

  let handleMouse = (e)=>{
    let pos = (getMousePos(e));

    if(mousePressed){
      clearCanvas(ctx);
      drawLine(ctx, pos.x, 0, pos.x, canvas.height);
      drawLine(ctx, 0, pos.y, canvas.width, pos.y);
    }
  }

  let handleMousePressed = (e)=>{
    mousePressed = true;
    console.log("mouse pressed");
  }

  let handleMouseUp = (e)=>{
    mousePressed = false;
    console.log("mouse up");
    clearCanvas(ctx);
  }

  let handleMouseLeave = (e)=>{
    clearCanvas(ctx);
    mousePressed = false;
  }

  canvas.onmousemove = (handleMouse);
  canvas.onmousedown = (handleMousePressed);
  canvas.onmouseup = (handleMouseUp);
  canvas.onmouseleave = (handleMouseLeave);

  window.canvas = {
    canvas,
    setup: {
      size: (list)=>{
        canvas.width = list[0];
        canvas.height = list[1]
      },
      background: (list)=>{
        
      }
    }
  }
})();