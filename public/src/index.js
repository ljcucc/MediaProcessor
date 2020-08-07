'use strict';

(()=>{
  let txtarea = document.querySelector("#layers");
  
  //function
  function auto_complete(){

  }

  function auto_format(){
    let cursorPos = txtarea.selectionStart;
    let linePos = (txtarea.value.substring(0, cursorPos).match(/\n/g)?.length || 0 )
    // console.log("\n")
    // console.log({
    //   cursorPos,
    //   linePos
    // });
    let lineText = txtarea.value.split("\n")[linePos];
    // console.log(lineText);

    let indentLevel = (()=>{
      let trimed = lineText.trim();
      if(trimed == ""){
        // console.log("spacing")
        return String(lineText).length / 2;
      }
      
      let checkCapital = (text, regex) => text.indexOf( (text.match(regex) || [null])[0] );

      let capital = checkCapital(lineText, /\+|\-/g);
      

      if(checkCapital(trimed, /\+/g) == 0){
        // console.log(`capital head ${capital}`)
        return capital / 2;
      }else if(checkCapital(trimed, /\-/g) == 0){
        // console.log(`capital property ${capital}`)
        return capital / 2 - 1;
      }

      return -1;
    })();

    txtarea.value = txtarea.value.substring(0, cursorPos) + `\n${(()=>{
      let result = "";
      for(let i = 0; i < indentLevel+1; i++){
        result += "  ";
      }
      return result;
    })()}` + txtarea.value.substring(cursorPos);
    
    let newCursorPos = cursorPos + (indentLevel+1)*2 + 1;
    txtarea.selectionEnd = newCursorPos
    txtarea.selectionStart = newCursorPos;

    // console.log(txtarea.value);
  }

  let helperCheck = (text)=>!!(String(text).match(/(\-|\+)[\s\S]/g));
  let getLineText = ()=>{
    let cursorPos = txtarea.selectionStart;
    let linePos = (txtarea.value.substring(0, cursorPos).match(/\n/g)?.length || 0 )
    let lineText = txtarea.value.split("\n")[linePos];

    return (lineText);
  }

  txtarea.addEventListener("click", e=>{
    if(helperCheck(e.target.value)){
      helper.activate(getLineText());
    }
  })
  
  txtarea.addEventListener("keydown", e=>{
    if(e.key == "Tab"){
      e.preventDefault();
      auto_complete();

      if(helperCheck(e.target.value)){
        helper.activate(getLineText());
      }
    }
    
    if(e.code == "Enter"){
      e.preventDefault();
      auto_format();
    }
  });
})();