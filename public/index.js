(function(){
  var menu_commands = {
    _app__About: ()=>{
      alert("MediaProcessor:\n - version: alpha 0.1.0\n - author: ljcucc on Github");
    }
  };

  function menu_init(){
    var menus = document.querySelectorAll(".menu-list-container");
    for(var index in menus){
      if(typeof menus[index] != "object" || !menus[index]) continue;
      var menuList = menus[index].querySelectorAll(".item");
      var title = menus[index].querySelector(".button").innerHTML.trim();
      for(var item in menuList){
        if(!menuList[item].innerHTML) continue;
        var itemTitle = String(menuList[item].innerHTML);
        console.log(`${title}\t${get_menu_id(itemTitle)}`);
        menuList[item].addEventListener("click", menu_pressed);
      }
    }
  }

  var get_menu_id = (html)=>html.indexOf("<") > -1 ? html.substring(0, html.indexOf("<")): html;

  function find_menu_button(path){
    for(var index in path){
      if(!path[index].classList) continue;
      if(path[index].classList.contains("menu-list-container"))
        return path[index].querySelector(".button").innerHTML.trim();
    }
  }

  function menu_pressed(e){
    // console.log(e.path.querySelector(".button"))
    var menu_id = find_menu_button(e.path).replace("MediaProcessor","app");
    var item_id = get_menu_id(e.srcElement.innerHTML);

    var key = `_${menu_id}__${item_id}`;

    if(key in menu_commands){
      menu_commands[key]();
    }else{
      alert("menu command not found");
    }
  }

  window.addEventListener("load", ()=>{
    menu_init();
  })
  
})();