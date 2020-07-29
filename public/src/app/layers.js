(()=>{
  let id = "layers_list"
  window.dui.createDUI({
    id,
    name: "LayersList",
    constructor: ()=>{
      let uuid = uuidv4();

      

      return {
        uuid,
        type: id
      };
    }
  });
})();