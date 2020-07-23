function showDialog(data){
  $(".dialog>.title").text((data && "title" in data)?data.title: "Dialog");

  $(".dialog-container").fadeIn(150);
}

(()=>{
  window.addEventListener("load",()=>{
    $(".dialog>.close").click(()=>{
      $(".dialog-container").fadeOut(150);
    })
  })
})();