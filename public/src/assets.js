(()=>{
  function openImage(callback){
    showDialog({
      title:"Manage Assets",
      layout:dui.Column({
        child:[
          dui.Row({
            child:[
              dui.Button("Upload"),
              dui.Button("Delete")
            ]
          })
          
        ]
      })
    });
  }

  window.AssetsManager = {
    openImage
  }
})();