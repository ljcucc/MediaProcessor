function EditLayer(data){
    $(".preview-title").text(" / Property");
    $(".preview>.title").text((data && "title" in data)?data.title: "Preview");
    if(data && "layout" in data){
      dui.getDialogUI(data.layout, duiContainer=>{
        $(".preview-container").html(duiContainer);
      });
    }
}