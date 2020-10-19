
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  let voice = "Jorge";
  if (item.voiceSelect) {
    voice = item.voiceSelect.split(" ")[0];
  }
document.ondblclick = function () {
   var sel = (document.selection && document.selection.createRange().text) ||
             (window.getSelection && window.getSelection().toString());

  let utterance = new SpeechSynthesisUtterance(sel);
  let voices = speechSynthesis.getVoices();
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === voice) {
      utterance.voice = voices[i];
    }
  }
  speechSynthesis.speak(utterance);
};

}


let getting = browser.storage.sync.get("voiceSelect");
getting.then(onGot, onError);
