const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  // used for local testing
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  bookmarks.push(["www.shortemail.com"]);
  renderBookmarks(bookmarks);

  // used for the live chrome extension
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   bookmarks.push([tabs[0].url]);
  //   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //   renderBookmarks(bookmarks);
  // });
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  bookmarks = [];
  renderBookmarks(bookmarks);
});

copyBtn.addEventListener("click", function () {
  let copiedText = bookmarks.flat().join("\n");
  navigator.clipboard.writeText(copiedText);
});

function renderBookmarks(arr) {
  let liItem = "";
  for (let i = 0; i < arr.length; i++) {
    liItem += `<li><a target="_blank" href="${arr[i][0]}">${truncateUrl(
      arr[i][0]
    )}</a><button class="notes-btn button-invert" id='button-${i}'>+</button><div class="notes-div" id="notes-div-${i}"><p>${
      arr[i][1] || ""
    }</p></div></li>`;
  }
  ulEl.innerHTML = liItem;
  addNoteListeners();
}

function truncateUrl(url) {
  return url.length >= 50 ? url.slice(0, 47) + "..." : url;
}

renderBookmarks(bookmarks);

function addNoteListeners() {
  let allNotesBtns = document.querySelectorAll(".notes-btn");
  allNotesBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
      renderNoteInput(e);
    });
  });
}

function renderNoteInput(e) {
  const btnId = e.target.id;
  const index = parseInt(btnId.slice(-1));
  const existingInput = document.querySelector(`#add-note-${index}`);
  if (!existingInput) {
    createNoteForm(index);
  }
}
function createNoteForm(index) {
  const div = document.querySelector(`#notes-div-${index}`);
  const input = document.createElement("input");
  input.id = `add-note-${index}`;
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submit-btn");
  bookmarks[index][1]
    ? (submitBtn.innerText = "Update Note")
    : (submitBtn.innerText = "Add Note");
  div.append(input, submitBtn);

  submitBtn.addEventListener("click", function () {
    addNotes(input);
  });
}

function addNotes(input) {
  const value = input.value;
  const index = parseInt(input.id.slice(-1));

  bookmarks[index][1] = value;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks(bookmarks);
}

// NEXT STEPS:
// set a fixed width for the extension instead of a min-width
// add delete button to delete url
