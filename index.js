const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  bookmarks.push(["www.example.com"]);
  // let url;
  // chrome.tabs.query({ active: true, lastFocusedWinder: true }, function (tabs) {
  //   url = tabs[0].url;
  // });
  // bookmarks.push([url]);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks(bookmarks);
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
    liItem += `<li><a target="_blank" href="#">${
      arr[i][0]
    }</a><button class="notes-btn button-invert" id='button-${i}'>+</button><div class="notes-div" id="notes-div-${i}"><p>${
      arr[i][1] || ""
    }</p></div></li>`;
  }
  ulEl.innerHTML = liItem;
  addNoteListeners();
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
  const btn = e.target;
  const btnId = e.target.id;
  const index = parseInt(btnId.slice(-1));
  const existingInput = document.querySelector(`#add-note-${index}`);
  if (!existingInput) {
    const div = document.querySelector(`#notes-div-${index}`);
    console.log(div);
    // div.classList.add("notes-div");
    const input = document.createElement("input");
    input.id = `add-note-${index}`;
    const submitBtn = document.createElement("button");
    bookmarks[index][1]
      ? (submitBtn.innerText = "Update Note")
      : (submitBtn.innerText = "Add Note");
    div.append(input, submitBtn);
    // btn.insertAdjacentElement("afterend", div);

    submitBtn.addEventListener("click", function () {
      addNotes(input);
    });
  }
}

function addNotes(input) {
  const value = input.value;
  const index = parseInt(input.id.slice(-1));

  bookmarks[index][1] = value;
  console.log(bookmarks[index]);
  renderBookmarks(bookmarks);
}

// NEXT STEPS:
// Update 'add' button so it pulls the current url instead of our fixed url
