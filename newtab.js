/*
 * Generate HTML List From JavaScript Array
 *
 * @uri https://getbutterfly.com/generate-html-list-from-javascript-array/
 */
function makeList(listData) {
  // Establish the array which acts as a data source for the list
   console.log(listData);
  // Make a container element for the list
   listContainer = document.createElement("div");
    // Make the list
   listElement = document.createElement("ul");

  document.getElementsByTagName("body")[0].appendChild(listContainer);
  listContainer.appendChild(listElement);
  numberOfListItems = listData.length;

  for (i = 0; i < numberOfListItems; ++i) {
    // create an item for each one
    listItem = document.createElement("li");

    // Add the item text
    listItem.innerHTML = listData[i];

    // Add listItem to the listElement
    listElement.appendChild(listItem);
  }
}

async function setList(result) {
  if (list != null) {
    list = JSON.parse(result.list);
  } else {
    list = [];
  }
  makeList(list);
}

function onError(error) {}
let list = browser.storage.sync.get("list");
list.then(setList, onError);
let a = document.getElementById("my-manifest-placeholder")
console.log(a);
const stringManifest = JSON.stringify(myDynamicManifest);
const blob = new Blob([stringManifest], {type: 'application/json'});
const manifestURL = URL.createObjectURL(blob);
document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
