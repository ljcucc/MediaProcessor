(function(){
  var toolbox_lib = {
    color: {title: "Color"},
    select: {title: "Selection Cut"},
    curves_func: {title: "Curves Function"},
    filter: {title:"Filter Tool"},
    const: {title:"Constant"},
    if_condition: {title: "If Condition"},
    customize_builder: {title: "Blank Builder"}
  }
  var toolbox = ["color","select","curves_func","filter","const","if_condition", "customize_builder"].map(e=>{
    return {
      title: toolbox_lib[e].title,
      id:e
    };
  })

  var layers = [

  ];

  function registerDraggable(){
    document.querySelectorAll(".draggable-unregistered").forEach(e=>{
      e.addEventListener('dragstart', dragStart);
      e.classList.remove("draggable-unregistered");
      e.setAttribute('draggable', true)
    });

    document.querySelectorAll(".editable-unregistered").forEach(layers_dom=>{
      layers_dom.classList.remove("editable-unregistered");
      layers_dom.addEventListener('drop', dropped);
      layers_dom.addEventListener('dragenter', cancelDefault);
      layers_dom.addEventListener('dragover', (e)=>{
        cancelDefault(e);
        showInsertBox(true);
      });

      $(layers_dom).dblclick(e=>{ //dblclick
        // console.log(e);
        // console.log($(e.currentTarget))
        if(!$(e.currentTarget).hasClass("layers-list"))
        showDialog({
          title: "Edit builder",
          layout: dui.Padding({
            left: 10,
            child:dui.Column({child:[
              
              dui.TextField({hint: "Name"}),
              dui.Selector(),

              dui.Text("This is Builder Editor, which allows you to change the builder of the layers or edit the source code of builder to customize function"),
              dui.Button("Learn More"),
              dui.Button("Edit Code"),
            ]})
          })
        })
      });
    });
  }

  async function init(){
    console.log("loading toolbox.js");

    let toolbox_dom = document.querySelector(".toolbox-list")
    toolbox_dom.innerHTML = await toolbox.reduce((acc, cur)=>{
      return acc+`<div class="item toolbox-item draggable-unregistered " draggable="true" id="toolbox-${cur.id}">ƒ - ${cur.title}</div>`;
    }, "");

    registerDraggable();
  }

  function rerenderering(){
    console.log(layers);

    let layers_dom = document.querySelector("#layers_list")

    layers_dom.innerHTML = layers.reduce((acc, cur,index)=>{
      console.log(cur.id.replace("toolbox-",""));
      return acc+`<li class="item layer-item editable-unregistered draggable-unregistered arrow" draggable="true" id="toolbox-${cur.id}" key="${index}">ƒ - ${toolbox_lib[cur.id.replace(/(toolbox-)+/g,"")].title}</li>`;
    }, "");

    console.log("updated");

    registerDraggable();
  }

  function dropped (e) {
    cancelDefault(e);
    let id = e.dataTransfer.getData('text/plain');
    console.log("\n\n");
    console.log(e);
    showInsertBox(false);

    try{
      if(e.target.id == "layers_list" && !("index" in JSON.parse(id))){
        console.log("add after");
        layers.push(JSON.parse(id));
        rerenderering();
      }else if(e.target.classList.contains("layer-item")) {
        console.log("insert mode");

        var obj = JSON.parse(id);

        var temp = layers.splice(obj.index,1)[0];
        if (e.target.getAttribute("key") < obj.index) {
          layers.splice(e.target.getAttribute("key"), 0, temp);
        }else{
          layers.splice(e.target.getAttribute("key"), 0, temp);
        }
        // layers[obj.index].
        // layers[obj.index] = temp;

        console.log(layers[obj.index]);
        console.log(layers[e.target.getAttribute("key")])

        rerenderering();
      }
    }catch(e){
      console.log(e);
    }
  }
  
  function cancelDefault (e) {
    e.preventDefault()
    e.stopPropagation()
    return false;
  }

  function dragStart(e){
    showInsertBox(true);
    console.log(e);
    if(e.target.classList.contains("toolbox-item")){
      e.dataTransfer.setData('text/plain', JSON.stringify({
        id:e.target.id
      }));
    }
    if(e.target.classList.contains("layer-item")){
      e.dataTransfer.setData('text/plain', JSON.stringify({
        id:e.target.id,
        index: e.target.getAttribute("key")
      }));
    }
    
  }

  function showInsertBox(toggler){
    document.querySelectorAll(".insert-box").forEach(e=>{
      if(toggler)
        e.classList.remove("hide");
      else
      e.classList.add("hide");
    })
  }

  window.addEventListener("load", e=>{
    init();
  });
})();