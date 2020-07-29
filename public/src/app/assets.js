(()=>{
  function openImage(callback){
    var upload_button = dui.Button("Upload",{
      onPressed: ()=>{

      }
    });

    showDialog({
      title:"Manage Assets",
      layout:dui.Column({
        child:[
          dui.Row({
            child:[
              upload_button,
              dui.Button("Delete")
            ]
          })//Row
          
        ]
      })//Column
    });
  }

  window.AssetsManager = {
    openImage
  }
})();