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
})();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}