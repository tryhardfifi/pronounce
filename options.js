async function getPage() {}
function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  var voices = speechSynthesis.getVoices().sort((a, b) => a.lang.localeCompare(b.lang));

  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    voiceSelect: document.querySelector("#voiceSelect").value,
    isOn: document.querySelector("#isOn").checked
  });

  browser.runtime.reload();
  window.close();
}

function url_domain(data) {
  var a = document.createElement("a");
  a.href = data;
  return a.hostname;
}

function addToBlacklist(e) {
  async function store(result) {

    if (result.blacklist == null){
        blacklist = [""];
    }
    else{
        blacklist = JSON.parse(result.blacklist);
    }
    current_url = await browser.tabs
      .query({ currentWindow: true, active: true })
      .then((tabs) => {
        return tabs[0].url;
      });
    hostname = url_domain(current_url);

    if (!blacklist.includes(hostname)) {
      blacklist.push(hostname);

        document.querySelector("#blacklist").innerHTML = 'de-blacklist';
    }
    else {
        index = blacklist.indexOf(hostname);
        if (index > -1){
            blacklist.splice(index,1);
        }
        document.querySelector("#blacklist").innerHTML = 'blacklist';

   }

    blacklist = JSON.stringify(blacklist);
      e.preventDefault();
      browser.storage.sync.set({
        blacklist: blacklist,
      });

  browser.runtime.reload();
  window.close();
  }

  function onError(error) {
    browser.storage.sync.set({
      blacklist: JSON.stringify([""]),
    });
  }

  let blacklist = browser.storage.sync.get("blacklist");
  blacklist.then(store, onError);
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#voiceSelect").value =
      result.voiceSelect || "en-US";
  }
  function setIsOn(result) {
    document.querySelector("#isOn").checked = result.isOn || false;
  }

  async function setBlacklist(result) {
      blacklist = JSON.parse(result.blacklist);
     current_url = await browser.tabs
      .query({ currentWindow: true, active: true })
      .then((tabs) => {
        return tabs[0].url;
      });
    hostname = url_domain(current_url);
    if (blacklist.includes(hostname)){
        document.querySelector("#blacklist").innerHTML = 'deblacklist';
    }
    else{
        document.querySelector("#blacklist").innerHTML = 'blacklist';
    }
  }

  function onError(error) {}
  let getting = browser.storage.sync.get("voiceSelect");
  getting.then(setCurrentChoice, onError);
  let isOn = browser.storage.sync.get("isOn");
  isOn.then(setIsOn, onError);
  let blacklist = browser.storage.sync.get("blacklist");
  blacklist.then(setBlacklist, onError);

}
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  document.querySelector("#chromeText").remove();
}
document.querySelector("#voiceSelect").addEventListener("change", saveOptions);
document.querySelector("#isOn").addEventListener("change", saveOptions);
document.querySelector("#blacklist").addEventListener("click", addToBlacklist);

document.addEventListener("DOMContentLoaded", restoreOptions);
