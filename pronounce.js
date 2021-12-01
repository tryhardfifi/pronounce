function onError(error) {}

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
	  lang = voices[i].lang;
        }
      }
      speechSynthesis.speak(utterance);
      addToList(sel,voice,lang);
    }
  };
}
function addToList(sel,voice) {
  async function store(result) {
    if (result.list == null) {
      list = [];
    } else {
      list = JSON.parse(result.list);
    }

    if (!list.includes(sel)) {
      list.push([sel,voice,lang]);
      list = JSON.stringify(list);
      browser.storage.sync.set({
        list: list,
      });
    }
  }

  let list = browser.storage.sync.get("list");
  list.then(store, onError);
}

function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

async function onGotBlacklist(result) {
  blacklist = JSON.parse(result.blacklist);
  current_url = window.location.href;
  hostname = url_domain(current_url);
  console.log(current_url);
  if (!blacklist.includes(hostname)) {
    let isOn = browser.storage.sync.get("isOn");
    isOn.then(onGotIsOn, onError);
  }
}

async function onGotIsOn(isOn) {
  if (isOn.isOn == true) {
    let getting = browser.storage.sync.get("voiceSelect");
    getting.then(onGot, onError);
  }
}

let blacklist = browser.storage.sync.get("blacklist");
blacklist.then(onGotBlacklist, onError);
