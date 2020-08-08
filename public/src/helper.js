(()=>{
  let helperDOM;
  let cur_id = "";

  const database = {
    "::welcome":`# Welcome
      Welcome to use **MeidaProcessor**.find more help and resources on https://ljcucc.github.io/docs/media-processor/index.html

      Press [Tab] key while you typing to get more help.

    `,
    "background":`

    Porperty:
    background: [style]

    background is an property that setting the background style of the canvas.
    `
  };

  let getHelperDocs = (id)=>{
    let URLRegex = /(http|https):\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let titleRegex = /^(#{1,6}\s+[\S]+)/m;

    let markdown = database[id];

    console.log(markdown.match(titleRegex))

    markdown = (markdown.match(URLRegex) || []).reduce((acc, cur)=>acc.replace(cur, `<a target="_blank" href="${cur}">${cur}</a>`), markdown);
    markdown = (markdown.match(titleRegex) || []).reduce((acc, cur)=>acc.replace(cur, `<h${cur.trim().lastIndexOf("#")+1} class="title helper">${cur.replace("#","")}</h${cur.trim().lastIndexOf("#")+1}>`), markdown)
    markdown = (markdown.match(/\*\*(.*?)\*\*/gm) || []).reduce((acc, cur)=>acc.replace(cur, `<b>${cur.substring(2, cur.length-2)}</b>`), markdown)

    markdown = markdown.replace(/\n/g, "<br>")+"\n";
    console.log(markdown);

    return markdown;
  }

  let update = (id)=>{
    id = id.trim()
    if(cur_id == id) return;

    if(id in database)
      helperDOM.innerHTML = getHelperDocs(id);

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