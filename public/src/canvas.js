(()=>{
  var uuid, events;

  var drawFunction = {
    Color: (r,g,b)=>{
      if(r && g && b){
        return [r,g,b]
      }
      return [r,r,r];
    },
    setFillColor: (ctx, color)=>{
      console.log(`rgb(${color[0]}, ${color[1], color[2]})`)
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    },
    Rect:(ctx, x,y, width, height)=>{ 
      ctx.fillRect(x, y, width, height);
    },
    Image:(ctx)=>{

    }
  };

  function getHTMLTemplate(data){
    return `<canvas id="${data.uuid}" width="${data?.width || 320} height="${data?.height || 240}">
      <p>Opsss... Your browser doesn't support canvas.</p>
    </canvas>`;
  }

  function registerEvent(id, e){
    events = e;
    uuid = id;

    let canvas = $("#"+id).get(0);

    var mouse;

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    canvas.addEventListener('mousemove', function(evt) {
      mouse = getMousePos(canvas, evt);

      if(events?.onMouseMove)
      events.onMouseMove(mouse);
    }, false);

    if(events?.onStart)
      events.onStart(canvas.getContext('2d'), canvas);
  }

  window.duiCanvas = {
    getHTMLTemplate,
    registerEvent,
    draw:drawFunction
  };
})();