(()=>{
  let renderBtn = document.querySelector("#render");
  renderBtn.addEventListener("click", e=>{
    let layersCode = document.querySelector("#layers");
    console.log(layers.parse({
      string: layersCode.value,
      index: 0,
      level:0
    }));
  });
})();