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
      return `<div class="dui-text">${text.html().replace(/\n/g, "<br>")}</div>`
    },
    center: (data)=>{
      return `<div class="dui-center">${getDialogUI(data.child)}</div>`
    },
    textfield: (data)=>{
      return `<input class="dui-textfield" ${"hint" in data.data? `placeholder="${data.data.hint}"`: ""}/>`
    },
    padding: (data)=>{
      return `<div style="padding:${data.top}px ${data.right}px ${data.bottom}px ${data.left}px;">${getDialogUI(data.child)}</div>`
    },
    selector: (data)=>{
      return `
        <select class="dui-selector">
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
      return `<button class="dui-button">${data.text}</button>`
    }
  };

  function getDialogUI(layout, callback){
    if(callback){
      callback(duiBuilder[layout.type](layout));
      // add Events...
    }else{
      return duiBuilder[layout.type](layout)
    }
    
  }

  window.showDialog = showDialog;
  window.dui = {
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
      return {
        type: "selector",
        default: data?.default || "(Default)",
        list: data?.list || [["foo", "Foo"], ["bar", "Bar"]]
      }
    },
    Button: (text, data)=>{
      return {
        type: "button",
        text,
        data
      }
    }
  }
})();