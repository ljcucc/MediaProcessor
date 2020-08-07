(()=>{
  let canvas = document.querySelector("canvas");
  let mousePressed = false, mouseCovered = false;
  let scale = 1.0;
  let ctx = canvas.getContext("2d");

  let configUpdate = false;

  let config = {
    size: [300, 300],
    background: "white"
  }

  // Basic functions

  let getMousePos = (e)=>{ 
    let rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
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

  let refresh = ()=>{
    config.size = p_parms(config.size);
    canvas.width = config.size[0];
    canvas.height = config.size[1];

    console.log(config.size)

    runDefault(ctx);
  }

  let runDefault = (ctx)=>{
    clearCanvas(ctx);

    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Program

  // Event handler

  let handleMouse = (e)=>{
    let pos = (getMousePos(e));

    if(mousePressed){
      runDefault(ctx);
      drawLine(ctx, pos.x, 0, pos.x, canvas.height);
      drawLine(ctx, 0, pos.y, canvas.width, pos.y);
    }
  }

  let handleMousePressed = (e)=>{
    mousePressed = true;
    console.log("mouse pressed");

    runDefault(ctx);
  }

  let handleMouseUp = (e)=>{
    mousePressed = false;
    console.log("mouse up");
    
    runDefault(ctx);
  }

  let handleMouseLeave = (e)=>{
    runDefault(ctx);

    mousePressed = false;
    mouseCovered = false;
  };

  let handleMouseEnter = (e)=>{
    mouseCovered = true;
  }

  canvas.onmousemove = (handleMouse);
  canvas.onmousedown = (handleMousePressed);
  canvas.onmouseup = (handleMouseUp);
  canvas.onmouseleave = (handleMouseLeave);
  canvas.onmouseenter = (handleMouseEnter);
  window.addEventListener("keydown", e=>{
    if(!mouseCovered) return;

    if(e.key == "+"){
      scale += 0.2;
    }else if(e.key == "-"){
      scale -= 0.2;
    }

    canvas.style.transform = `scale(${scale})`;
  })

  // process parms
  let p_parms = (code)=>code.indexOf(",") > -1? code.split(","): code;

  refresh();

  window.canvas = {
    canvas,
    config,
    refresh
  }
})();