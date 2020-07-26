function EditLayer(data){
    $(".preview-title").text(" / Property");
    $(".preview>.title").text((data && "title" in data)?data.title: "Preview");
    if(data && "layout" in data){
      dui.getDialogUI(data.layout, duiContainer=>{
        $(".preview-container").html(duiContainer);
      });
    }
}

(()=>{
  function reload_preview(){
    $(".preview-container").html("");
    $(".preview-title").text("");
    $(".preview>.title").text(" ");
  }

  window.addEventListener("load",e=>{
    $(".preview-home").click(reload_preview)
  });

  window.MP_property = { //Property::MediaProcessor
    reload_preview
  }
})();



var specialPropertyUIBuilder = {
  image: ()=>{
    return dui.Column({
      child:[
        dui.Padding({
          top:16,
          bottom: 16,
          child:dui.Column({
              child:[
                dui.Text("Name:"),
                dui.TextField()
              ]
            }) //Column
        }) // Padding
      ] //child::Column
    }) //Column
  }
}