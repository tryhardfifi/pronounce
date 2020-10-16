document.ondblclick = function () {
   var sel = (document.selection && document.selection.createRange().text) ||
             (window.getSelection && window.getSelection().toString());

let utterance = new SpeechSynthesisUtterance(sel);
speechSynthesis.speak(utterance);
};
