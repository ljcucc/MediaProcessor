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
    }
  }
})();