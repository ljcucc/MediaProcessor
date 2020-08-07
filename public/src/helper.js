(()=>{
  let helperDOM;

  const database = {
    "::weclome":`
    <p>
      Welcome to use MeidaProcessor. find more help and resources on <a href="https://ljcucc.github.io/docs/media-processor/index.html">https://ljcucc.github.io/docs/media-processor/index.html</a>
    </p>

    <p>
      Press [Tab] key while you typing to get more help.
    </p>
    `
  };

  let activate = (linetext)=>{
    console.log("Enter helper.activate");
  }

  window.addEventListener("load", e=>{
    helperDOM = document.querySelector("#helper");
    console.log( database["::weclome"])
    console.log(helperDOM)
    helperDOM.innerHTML = database["::weclome"];
  })

  window.helper = {
    activate
  };
})();