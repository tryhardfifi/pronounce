
function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  var voices = speechSynthesis.getVoices();

  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    voiceSelect: document.querySelector("#voiceSelect").value
  });


browser.runtime.reload()
window.close();
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#voiceSelect").value = result.voiceSelect || "en-US";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("voiceSelect");
  getting.then(setCurrentChoice, onError);
}
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome){

document.querySelector("#chromeText").remove()
}
document.querySelector("#voiceSelect").addEventListener('change',saveOptions)
document.addEventListener("DOMContentLoaded", restoreOptions);
