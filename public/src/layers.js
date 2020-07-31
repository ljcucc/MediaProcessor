(()=>{
  console.log("layers.js loaded");

  const layerChar = "+";
  const propertyChar = "-"

  function parse(context){
    let strings = context?.string.split("\n");
    let result = [];
    let level = context?.level;

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

  window.layers = {
    parse
  }
})();