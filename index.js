const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    bookmarks.push([tabs[0].url]);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks(bookmarks);
  });
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

function renderBookmarks(bookmarks) {
  let allNotesBtns = document.querySelectorAll(".notes-btn");
  allNotesBtns.forEach(function (btn) {
    btn.removeEventListener("click", addNoteBtnListener);
  });
  let deleteNotesBtns = document.querySelectorAll(".delete-notes-btn");
  deleteNotesBtns.forEach(function (btn) {
    btn.removeEventListener("click", deleteBtnListener);
  });
  let liItem = "";
  for (let index = 0; index < bookmarks.length; index++) {
    liItem += `<li><a target="_blank" href="${
      bookmarks[index][0]
    }">${truncateUrl(
      bookmarks[index][0]
    )}</a><button class="notes-btn button-invert small-btn" id='button-${index}'>+</button><button class="delete-notes-btn button-invert small-btn" id='delete-button-${index}'>-</button><div class="notes-div" id="notes-div-${index}"><p>${
      bookmarks[index][1] || ""
    }</p></div></li>`;
  }
  ulEl.innerHTML = liItem;
  addNoteListeners();
  addDeleteListeners();
}

function truncateUrl(url) {
  return url.length >= 50 ? url.slice(0, 47) + "..." : url;
}

renderBookmarks(bookmarks);

function addNoteBtnListener(e) {
  renderNoteInput(e);
}

function addNoteListeners() {
  let allNotesBtns = document.querySelectorAll(".notes-btn");
  allNotesBtns.forEach(function (btn) {
    btn.addEventListener("click", addNoteBtnListener);
  });
}

function deleteBtnListener(e) {
  const btn = e.target;
  btn.removeEventListener("click", deleteBtnListener);
  deleteUrl(e);
}

function addDeleteListeners() {
  let deleteNoteBtns = document.querySelectorAll(".delete-notes-btn");
  deleteNoteBtns.forEach(function (btn) {
    btn.addEventListener("click", deleteBtnListener);
  });
}

function deleteUrl(e) {
  const btnId = e.target.id;
  const index = parseInt(btnId.slice(-1));
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks(bookmarks);
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

// need to remove event listeners. I think that will go in the render function at the beginning, in order to clear any old listeners before new nodes are created.
