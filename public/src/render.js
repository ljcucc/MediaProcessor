(()=>{

  const layerChar = "+";
  const propertyChar = "-"

  let cache;

  // Main Processing

  let eval_level = (layers)=>{
    for(let index in layers){
      let item = layers[index];

      if(item instanceof Array){
        eval_level(item);
        continue;
      }

      let parameters = (parms(item));

      if(item.level == 0 && parameters.type == "property")
        setup_canvas(parameters);
    }
  }

  let setup_canvas = (parameter)=>{
    console.log("setup_canvas");
    console.log(canvas.config);
    if(parameter.name in canvas.config){
      canvas.config[parameter.name] = (parameter.values);
      canvas.refresh();
    }else{
      alert(`Canvas property '${parameter.name}' not found, can't be setup.`)
    }
  }

  let eval = (string)=>{
    string = String(string);
    let result = (parse({
      string,
      index: 0,
      level:0
    }));

    eval_level(result);

    result = null;
  }

  let parms = (item)=>{
    let type = item.type;
    let code = item.item;

    let headChar = type == "layer" ? "+" : "-";
    
    code = code.substring(code.indexOf(headChar)+1).trim();

    if(type == "layer")
      return {
        type,
        name: code
      }
    else{
      code = code.split(/\:/g);

      let name = code[0];
      let values = code[1];

      return {
        type,
        name,
        values
      }
    }
  }

  let render = (layers)=>{
    if(!cache) alert("Eval cache is null, try eval before render or run [Eval & Render]")
  }

  let parse = (context)=>{
    let strings = String(context?.string).split("\n");
    let result = [];
    let level = Number(context?.level);

    if(typeof context.index == "undefined") context.index = 0;

    while(context.index < strings.length){
      let item = strings[context.index];
      let type = (()=>{
        let trimed = item.trim();
        if(trimed.indexOf(layerChar) == 0)
          return "layer";
        else if(trimed.indexOf(propertyChar) == 0)
          return "property";
        else
          return "syntax_err"
      })();

      let item_level = (()=>{
        switch(type){
          case "layer":
            return item.indexOf(layerChar)
          case "property":
            return item.indexOf(propertyChar);
          case "syntax_err":
            return -1;
        }
      })();

      if(item_level>level){
        context.level = item_level;
        result.push(parse(context));
      }else if(item_level == level){
        result.push({item, type,level});
        context.index++;
      }else{ //item_level<level
        return result;
      }

      console.log({item, type,level});
    }

    console.log(`level end: ${level}`)

    return result;
  }

  // UI Processing

  let layersCode = document.querySelector("#layers");

  document.querySelector("#eval").addEventListener("click", e=>{
    eval(String(layersCode.value));
  });

  document.querySelector("#render").addEventListener("click", e=>{
    render();
  });

  document.querySelector("#render_eval").addEventListener("click", e=>{
    eval(String(layersCode.value));
    render();
  });
})();