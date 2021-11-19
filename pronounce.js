function onError(error) {
}

function onGot(item) {
  speechSynthesis.getVoices();
  var voice = "Alex (en-US)";
  if (item.voiceSelect) {
    voice = item.voiceSelect.split(" ")[0];
  }
  document.ondblclick = async function () {
    var sel =
      (document.selection && document.selection.createRange().text) ||
      (window.getSelection && window.getSelection().toString());

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

function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

async function onGotBlacklist(result){
     blacklist = JSON.parse(result.blacklist);
     current_url = window.location.href
     hostname = url_domain(current_url);
     if (!blacklist.includes(hostname)){
         let isOn = browser.storage.sync.get("isOn");
         isOn.then(onGotIsOn, onError);
     }
}
async function onGotIsOn(isOn){
  if (isOn.isOn == true){
    let getting = browser.storage.sync.get("voiceSelect");
    getting.then(onGot, onError);
  }
}

let blacklist = browser.storage.sync.get("blacklist");
blacklist.then(onGotBlacklist, onError);




