(()=>{
  let helperDOM;
  let cur_id = "";

  const database = {
    "::welcome":`
    <p>
      Welcome to use MeidaProcessor. find more help and resources on <a href="https://ljcucc.github.io/docs/media-processor/index.html">https://ljcucc.github.io/docs/media-processor/index.html</a>
    </p>

    <p>
      Press [Tab] key while you typing to get more help.
    </p>
    `,
    "background":`
    <p>
    background: [style]
    </p>
    background is an property that setting the background style of the canvas.
    `
  };

  let update = (id)=>{
    id = id.trim()
    if(cur_id == id) return;

    if(id in database)
      helperDOM.innerHTML = database[id];

    cur_id = id;
  }

  let activate = (linetext)=>{
    linetext = String(linetext);

    console.log("Enter helper.activate");
    console.log(linetext);

    if(linetext.trim().indexOf("+") == 0){
      update(linetext.trim().replace("+","").split(":")[1]);
    }else if(linetext.trim().indexOf("-") == 0){
      update(linetext.trim().replace("-","").split(":")[0]);
    }
  }

  window.addEventListener("load",async  e=>{
    helperDOM = document.querySelector("#helper");
    await update("::welcome")
  })

  window.helper = {
    activate
  };
})();