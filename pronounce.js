function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  if (item.voiceSelect) {
    voice = item.voiceSelect.split(" ")[0];
  }
  else {
    let voice = "Alex (en-US)";
  }
  document.ondblclick = function () {
    var sel =
      (document.selection && document.selection.createRange().text) ||
      (window.getSelection && window.getSelection().toString());
    console.log(sel.split(" ").length);
    const regex = /[^\s]+/gm;
    const found = sel.match(regex);
    if (found.length == 1) {
      let utterance = new SpeechSynthesisUtterance(sel);

      let voices = speechSynthesis.getVoices();
      for (i = 0; i < voices.length; i++) {
        if (voices[i].name === voice) {
          utterance.voice = voices[i];
        }
      }
      speechSynthesis.speak(utterance);
    }
  };
}




      
let getting = browser.storage.sync.get("voiceSelect");
getting.then(onGot, onError);



