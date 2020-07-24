(()=>{
  window.addEventListener("load",()=>{
    $(".dialog>.close").click(()=>{
      $(".dialog-container").fadeOut(150);
    })
  });

  function showDialog(data){
    $(".dialog>.title").text((data && "title" in data)?data.title: "Dialog");
    if(data && "layout" in data){
      getDialogUI(data.layout, duiContainer=>{
        $(".dialog>.dui").html(duiContainer);
      });
    }
    
    $(".dialog-container").fadeIn(150);
  }

  var events = [];

  var duiBuilder = {
    column: (data)=>{
      return `<div class="dui-column-container"> ${
        data.child.reduce((acc, cur)=>{
          return acc + `<div class="dui-column">${getDialogUI(cur)}</div>`
        },"")
      }</div`;
    },
    text: (data)=>{
      var text = $(`<div class="dui-text"></div>`);
      text.text(data.text);
      return `<div class="dui-text" style="${data.other?.style?.font? `font-family:${data.other?.style?.font};`: ""} ${data.other?.style?.fontSize? `font-size:${data.other?.style?.fontSize};`: ""}">${text.html().replace(/\n/g, "<br>")}</div>`
    },
    center: (data)=>{
      return `<div class="dui-center">${getDialogUI(data.child)}</div>`
    },
    textfield: (data)=>{
      return `<input class="dui-textfield" placeholder="${data.data?.hint || "type anything"}"/>`
    },
    padding: (data)=>{
      return `<div style="padding:${data.top}px ${data.right}px ${data.bottom}px ${data.left}px;">${getDialogUI(data.child)}</div>`
    },
    selector: (data)=>{
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
    button: (data)=>{
      return `<button class="dui-button" id="${data.uuid}">${data.text}</button>`
    },
    codeeditor: (data)=>{
      return `<textarea class="dui-codeeditor"></textarea>`
    }
  };

  function getDialogUI(layout, callback){
    if(callback){
      callback(duiBuilder[layout.type](layout));
      // add Events...
      registerEvents();
    }else if(layout){
      console.log(layout.type);
      return duiBuilder[layout.type](layout)
    }
    return "";
    
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
      var event = events.pop();
      if(event.type in duiEventRegister)
        duiEventRegister[event.type](event.id, event.callback);
      // if(event)
    }
  }

  window.showDialog = showDialog;
  window.dui = {
    getDialogUI,
    Column: (data)=>{
      return {
        type:"column",
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
      return{
        type: "center",
        child: data.child
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
      }
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
        onPressed: data?.onPressed || null
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
    }
  };

  function addEvents(id, type, callback){
    events.push({
      id,
      type,
      callback
    });
  }
})();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}