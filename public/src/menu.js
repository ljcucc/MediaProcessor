(function(){
  let menu_commands = {
    about: ()=>{
      showDialog({
        title: "About",
        layout: dui.Center({
          child:dui.Text("This app is made by @ljcucc\n you can find more things about him on github.")})
      });
      // alert("MediaProcessor:\n - version: alpha 0.1.0\n - author: ljcucc on Github");
    },
    quit: ()=>{
      alert("You can't quit");
    }
  };

  let menus = [
    {type: "menu", title: "MediaProcessor", menu:[
      {type:"item",title: "About", id:"about"},
      {type:"item", title: "Settings", id:"settings", bind:"C-,"},
      {type:"split"},
      {type:"item", title:"Quit", id:"quit", bind:"C-q"}
    ]},
    {type:"menu", title: "File",menu:[
      {type:"item",title: "New", id:"new", bind:"C-n"},
      {type:"item",title: "Clone", id:"clone", bind:"C-n"},
      {type:"split"},
      {type:"item",title: "Open", id:"open", bind:"C-o"},
      {type:"item",title: "Save", id:"save", bind:"C-s"},
      {type:"item",title: "Save as", id:"save_as", bind:"C-S"}
    ]},
    {type:"menu", title: "Edit",menu:[
      {type:"item",title: "Copy", id:"copy", bind:"C-c"},
      {type:"item",title: "Cut", id:"cut", bind:"C-x"},
      {type:"item",title: "Paste", id:"paste", bind:"C-v"},
      {type:"split"},
      {type:"item",title: "Undo", id:"undo", bind:"C-z"},
      {type:"item",title: "Redo", id:"redo", bind:"C-Z"}
    ]},
    {type:"menu", title: "View", menu:[
      {type:"item",title: "Zoom in", id:"zoom_in", bind:"C-+"},
      {type:"item",title: "Zoom out", id:"zoom_out", bind:"C--"},
    ]}
  ];

  function gen_menu(menu){
    return menu.reduce((acc, cur)=>{
      console.log(cur);
      return acc+html(cur);
    },"");

    function html(obj){
      if(obj.type == "menu"){
        return `<span class="menu-list-container"><button class="button">
        ${obj.title}
      </button><div class="menu-list">${gen_menu(obj.menu)}</div></span>`
      }else if(obj.type == "item"){
        return `<div class="item" id="menu_btn:${obj.id}">${obj.title} ${"bind" in obj?`<span class="shortcut">${
          ((e)=>(e.toUpperCase() == e && !!e.match(/[a-z]/i)) ? e.replace("⌘","⌘⇧") : e.toUpperCase())(obj.bind.replace("C-","⌘"))
        }<span>`:""}</div>`;
      }else if(obj.type == "split"){
        return `<div class="split"></div>`;
      }
    }
  }

  function menu_init(){
    let menus = document.querySelectorAll(".menu-list-container");
    for(let index in menus){
      if(typeof menus[index] != "object" || !menus[index]) continue;
      let menuList = menus[index].querySelectorAll(".item");
      for(let item in menuList){
        if(!menuList[item].innerHTML) continue;
        menuList[item].addEventListener("click", menu_pressed);
      }
    }
  }

  function menu_pressed(e){
    let item_id = e.srcElement.id.replace("menu_btn:","");
    item_id in menu_commands?menu_commands[item_id]():(0);
  }

  window.addEventListener("load", ()=>{
    document.querySelector(".menu-bar").innerHTML = gen_menu(menus);
    menu_init();
  })
  
})();