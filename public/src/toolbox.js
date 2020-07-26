(function(){
  var toolbox_lib = {
    color: {title: "Color"},
    image:{title: "Image"},
    fill:{title: "Fill"},
    select: {title: "Selection Cut"},
    curves_func: {title: "Curves Function"},
    filter: {title:"Filter Tool"},
    const: {title:"Constant"},
    if_condition: {title: "If Condition"},
    customize_builder: {title: "Blank Builder"}
  }
  var toolbox = ["color","image","fill","select","curves_func","filter","const","if_condition", "customize_builder"].map(e=>{
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

      $(layers_dom).click(propertyUIBuilder);

      $(layers_dom).click(sourceCodeUIBuilder);
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
      return acc+`<li class="item layer-item editable-unregistered draggable-unregistered arrow" draggable="true" id="toolbox-${cur.id}" key="${index}" data="${encodeURI(JSON.stringify(cur.data))}">ƒ - ${toolbox_lib[cur.id.replace(/(toolbox-)+/g,"")].title}</li>`;
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

    var obj = JSON.parse(id);

    try{
      if(e.currentTarget.id == "layers_list" && ("new" in obj && obj.new)){
        console.log("add after");
        obj.new = false;
        layers.push(obj);
        rerenderering();
      }else if(e.currentTarget.classList.contains("layer-item") && ("new" in obj && !obj.new)) {
        var placeIndex = e.target.getAttribute("key");
        console.log("insert mode");

        var temp = layers.splice(obj.index,1)[0];
        // if (placeIndex < obj.index) {
        //   layers.splice(placeIndex, 0, temp);
        // }else{
        //   layers.splice(placeIndex, 0, temp);
        // }
        layers.splice(placeIndex, 0, temp);

        console.log(layers[obj.index]);
        console.log(layers[placeIndex])

        rerenderering();
      }else if(("new" in obj && obj.new)){
        var placeIndex = e.target.getAttribute("key");

        obj.new = false;
        layers.splice(placeIndex,0,obj);

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
    if(e.target.classList.contains("toolbox-item")){ // new item to be add
      e.dataTransfer.setData('text/plain', JSON.stringify({
        id:e.target.id,
        data: {
          id: e.target.id,
          uuid: uuidv4()
        },
        new:true
      }));
    }
    if(e.target.classList.contains("layer-item")){
      e.dataTransfer.setData('text/plain', JSON.stringify({
        id:e.target.id,
        data: JSON.parse(decodeURI($(e.target).attr("data"))),
        index: e.target.getAttribute("key"),
        new: false
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

  function propertyUIBuilder(e){ //dblclick
    if(e.altKey || e.ctrlKey) return;
    if($(e.currentTarget).hasClass("layers-list")) return;

    var obj = (JSON.parse(decodeURI($(e.target).attr("data"))));
    let type = obj.id.replace("toolbox-", "");

    var propertyUI = type in specialPropertyUIBuilder? specialPropertyUIBuilder[type]() : dui.Text("");
    console.log(propertyUI);

    EditLayer({
      title: " ",
      layout: dui.Padding({
        left: 10,
        child:dui.Column({child:[
          dui.Canvas({
            onStart:ctx=>{
              console.log(ctx);
              console.log("canvas ready");

              let draw = duiCanvas.draw;

              draw.setFillColor(ctx, draw.Color(255));
              draw.Rect(ctx, 0,0,100,100);
            },
            onMouseMove:(mouse)=>{
              console.log(mouse);
            }
          }),
          propertyUI,
          dui.Text(`uuid: ${obj.uuid}\n\n`,{
            style:{
              font: "monospace",
              fontSize: "16px"
            }
          }),
          dui.Text("Default Template:"),
          dui.Selector({
            list:toolbox.map(item=>[[item.id], [item.title]]),
            onStart: (e)=>{
              console.log("on start!");
              console.log(obj);
              console.log(obj.id.replace("toolbox-",""));

              e.val(obj.id.replace("toolbox-",""));
            }
          }),
          dui.Text("You're editing the template of builder. for quick advence, click the same layer with option(ALT) key. or click [Edit Code]\n\n"),
          dui.Button("Learn More", {
            onPressed: ()=>{
              window.open("https://ljcucc.github.io/MediaProcessor/");
            }
          }),
          dui.Button("Edit Code"),
        ]}) //Column
      }) //Padding
    })// showDialog
    
  }

  function sourceCodeUIBuilder(e){
    { //dblclick
      if(!e.altKey && !e.ctrlKey) return;
      if(!$(e.currentTarget).hasClass("layers-list"))
      showDialog({
        title: "Builder Source Code",
        layout: dui.Padding({
          left: 10,
          child:dui.Column({child:[
            dui.Text("This is Builder Editor, which allows you to change the builder of the layers or edit the source code of builder to customize function. click [Edit Code] to edit the builder source code."),
            dui.Button("Learn More"),
            dui.Text("\n\nDefault builder:"),
            dui.Selector({
              list:toolbox.map(item=>[[item.id], [item.title]])
            }),

            dui.CodeEditor(),
            dui.Button("Done"),
            dui.Button("Cancel"),
          ]}) //Column
        }) //Padding
      })// showDialog
    }
  }

  window.addEventListener("load", e=>{
    init();
  });
})();