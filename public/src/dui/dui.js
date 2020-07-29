// DUI.js API

(()=>{
  let events = [];

  var duiBuilder = {
    Column: (data)=>{
      return `<div class="dui-column-container"> ${
        data.child.reduce((acc, cur)=>{
          return acc + `${cur}`
        },"")
      }</div`;
    },
    Row: (data)=>{
      return `<div class="dui-row-container">${
        data.child.reduce((acc, cur)=>{
          return acc + `${cur}`
        },"")
      }</div>`
    },
<<<<<<< HEAD
    Text: (t,data)=>{
      let text = $(`<div class="dui-text"></div>`);
      text.text(t);
      return `<div class="dui-text" style="${data?.style?.font? `font-family:${data?.style?.font};`: ""} ${data?.style?.fontSize? `font-size:${data?.style?.fontSize};`: ""}">${text.html().replace(/\n/g, "<br>")}</div>`
=======
    text: (data)=>{
      var text = $(`<div class="dui-text"></div>`);
      text.text(data.text);
      return `<div class="dui-text" style="${data.other?.style?.font? `font-family:${data.other?.style?.font};`: ""} ${data.other?.style?.fontSize? `font-size:${data.other?.style?.fontSize};`: ""}">${text.html().replace(/\n/g, "<br>")}</div>`
    },
    center: (data)=>{
      return `<div class="dui-center">${dui.getTemplate(data)}</div>`
>>>>>>> be3e8e0d18084aeaf7bc1ee55713b2d6ea19be3e
    },
    Center: (data)=>{
      return `<div class="dui-center">${data.child}</div>`
    },
    TextField: (data)=>{
      return `<input class="dui-textfield" placeholder="${data?.hint || "type anything"}"/>`
    },
    Padding: (d)=>{
      let data = {
        left: d.left || 0,
        right: d.right || 0,
        top: d.top || 0,
        bottom: d.bottom || 0
      }
      return `<div style="padding:${data.top}px ${data.right}px ${data.bottom}px ${data.left}px;">${d.child}</div>`
    },
    Selector: (data)=>{
      let uuid = uuidv4();

      addEvents(uuid, "selector", {
        onStart: data?.onStart || null,
        onChoose: data?.onChoose || null
      });

      data = {
        default: data?.default || "(Default)",
        list: data?.list || [["foo", "Foo"], ["bar", "Bar"]],
        uuid
      }


      return `
        <select class="dui-selector" id="${data.uuid}">
          <option>${data.default}</option>
          ${
            data.list.reduce((acc,cur)=>{
              return acc+`<option value="${cur[0]}">${cur[1]}</option>`;
            },"")
          }
        </select>
      `;
    },
    Button: (text, data)=>{
      let uuid = uuidv4();

      addEvents(uuid, "button", {
        onPressed: data?.onPressed
      })

      data = {
        text,
        data,
        uuid
      };

      return `<button class="dui-button" id="${data.uuid}">${data.text}</button>`
    },
    CodeEditor: (data)=>{
      return `<textarea class="dui-codeeditor"></textarea>`
    }
  };

  function getTemplate(layout, callback){
    if(callback){
      callback(layout);
      // add Events...
      registerEvents();
    }
  }

  var duiEventRegister = {
    selector: (id, events)=>{
      console.log(id, events);
      if(events?.onStart)
        events.onStart($("#"+id));
      if(events?.onChoose) 
        $(id).change(()=>events.onChoose($("#"+id)));
    },
    button: (id, events)=>{
      if(events?.onPressed)
        $("#"+id).click(e=>events.onPressed(e))
    }
  }

  function registerEvents(){
    console.log(events);
    while(events.length != 0){
      let event = events.pop();
      if(event.type in duiEventRegister)
        duiEventRegister[event.type](event.id, event.callback);
      // if(event)
    }
  }

  window.dui = Object.assign({
    createDUI,
    getTemplate,
    addEvents,
<<<<<<< HEAD
  }, duiBuilder);
=======
    Column: (data)=>{
      return {
        type:"column",
        child: data.child
      };
    },
    Row: data=>{
      return {
        type: "row",
        child: data.child
      };
    },
    Text: (text, data)=>{
      return {
        type:"text",
        text,
        other: data
      };
    },
    Center: (data)=>{
      return {
        type: "center",
        child: data
      }
    },
    TextField: (data)=>{
      return {
        type: "textfield",
        data
      };
    },
    Padding: (data)=>{
      return {
        type: "padding",
        left: data.left || 0,
        right: data.right || 0,
        top: data.top || 0,
        bottom: data.bottom || 0,
        child:data.child
      };
    },
    Selector: (data)=>{
      var uuid = uuidv4();

      addEvents(uuid, "selector", {
        onStart: data?.onStart || null,
        onChoose: data?.onChoose || null
      });

      return {
        type: "selector",
        default: data?.default || "(Default)",
        list: data?.list || [["foo", "Foo"], ["bar", "Bar"]],
        uuid
      }
    },
    Button: (text, data)=>{
      var uuid = uuidv4();

      addEvents(uuid, "button", {
        onPressed: data?.onPressed
      })

      return {
        type: "button",
        text,
        data,
        uuid
      }
    },
    CodeEditor: (data)=>{
      return {
        type: "codeeditor"
      }
    },
  };
>>>>>>> be3e8e0d18084aeaf7bc1ee55713b2d6ea19be3e

  function addEvents(id, type, callback){
    events.push({
      id,
      type,
      callback
    });
  }

  function createDUI(config){
    let id = config?.id, builder = config?.template, EventRegister = config?.events, methodName = config?.name
    // if(!(methodName in window.dui) && method){
    //   window.dui[methodName] = method;
    // }else
    //   throw `method ${methodName} is exist`;
    
    if(!(methodName in duiBuilder) && builder)
      window.dui[methodName] = builder;
    else
      throw `builder ${id} is exist`;
    
    if(!(id in duiEventRegister) && EventRegister)
      duiEventRegister[id] = EventRegister;
    else
      throw `EventRegister ${id} is exist`;
    
    
    console.log(config);
    console.log(window.dui);
  }
})();