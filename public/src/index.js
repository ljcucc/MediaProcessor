(()=>{
  let renderBtn = document.querySelector("#render");
  let txtarea = document.querySelector("#layers");
  
  renderBtn.addEventListener("click", e=>{
    let layersCode = document.querySelector("#layers");
    console.log(layers.parse({
      string: layersCode.value,
      index: 0,
      level:0
    }));
  });
  
  document.addEventListener("keypress", e=>{
    e.preventDefault();
    console.log(e);
  })
})();