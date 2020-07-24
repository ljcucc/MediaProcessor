(()=>{
  var uuid, events;

  function getHTMLTemplate(data){
    return `<canvas id="${data.uuid}" width="${data?.width || 320} height="${data?.height || 240}">
        <p>Opsss... Your browser doesn't support canvas.</p>
    </canvas>`;
  }

  function registerEvent(id, e){
    events = e;
    uuid = id;

    if(events?.onStart)
      events.onStart($("#"+id).getContext('2d'));
  }

  window.duiCanvas = {
    getHTMLTemplate,
    registerEvent
  };
})();