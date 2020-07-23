(()=>{
  window.addEventListener("load",()=>{
    $(".dialog>.close").click(()=>{
      $(".dialog-container").fadeOut(150);
    })
  });

  function showDialog(data){
    $(".dialog>.title").text((data && "title" in data)?data.title: "Dialog");
    if(data && "layout" in data){
      var duiContainer  = getDialogUI(data.layout);
      $(".dialog>.dui").html(duiContainer.html);
    }
    
    $(".dialog-container").fadeIn(150);
  }

  var duiBuilder = {
    column: (data)=>{
      return data.child.reduce((acc, cur)=>{
        return acc + `<div class="dui-textbody">${cur}</div>`
      },"");
    }
  }

  function getDialogUI(layout){
    return {
      html:duiBuilder[layout.type](layout)
    };
  }

  window.showDialog = showDialog;
  window.dui = {
    Column: (data)=>{
      return {
        type:"column",
        child: data.child
      };
    },
    Text: (data)=>{
      return {
        type:"text",
        text: data.text,
        other: data
      };
    }
  }
})();