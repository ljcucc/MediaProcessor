(()=>{
  let helperDOM;

  const database = {
    "::weclome":`Welcome <br>`
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