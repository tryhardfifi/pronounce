function onError(error) {
}

function onGot(item) {
  speechSynthesis.getVoices();
  var voice = "Alex (en-US)";
  if (item.voiceSelect) {
    voice = item.voiceSelect.split(" ")[0];
  }
      console.log(voice)
  document.ondblclick = async function () {
    var sel =
      (document.selection && document.selection.createRange().text) ||
      (window.getSelection && window.getSelection().toString());

      console.log(voice)
    const regex = /[^\s]+/gm;
    const found = sel.match(regex);
    let voices = speechSynthesis.getVoices();
    if (found && found.length == 1) {
      let utterance = new SpeechSynthesisUtterance(sel);
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



