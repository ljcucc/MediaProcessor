let garbageBin;
(()=>{
  function reload_preview(){
    if (typeof(garbageBin) === 'undefined'){
      //Here we are creating a 'garbage bin' object to temporarily 
      //store elements that are to be discarded
      garbageBin = document.createElement('div');
      garbageBin.style.display = 'none'; //Make sure it is not displayed
      document.body.appendChild(garbageBin);
    }
    let nodes = document.querySelector(".preview-container").childNodes;
    for(let i in nodes){
      garbageBin.append(nodes[i]);
      garbageBin.innerHTML = "";
    }

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

let templatePropertys = { // [id, type, title]
  image:[
    ["name", "string", "Name"],
    ["src", "string", "Asset"]
  ],
  color:[
    ["red", "number", "R"],
    ["green", "number", "G"],
    ["blue", "number", "B"]
  ]
}

let specialPropertyUIBuilder = {
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