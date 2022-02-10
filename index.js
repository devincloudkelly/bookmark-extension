const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  // bookmarks.push(["www.example.com"]);
  let url;
  chrome.tabs.query({ active: true, lastFocusedWinder: true }, function (tabs) {
    url = tabs[0].url;
  });
  bookmarks.push([url]);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks(bookmarks);
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  bookmarks = [];
  renderBookmarks(bookmarks);
});

copyBtn.addEventListener("click", function () {
  let copiedText = bookmarks.join("\n");
  navigator.clipboard.writeText(copiedText);
});

function renderBookmarks(arr) {
  let liItem = "";
  for (let i = 0; i < arr.length; i++) {
    liItem += `<li><a target="_blank" href="#">${arr[i][0]}</a><p>${
      arr[i][1] || ""
    }</p><button class="notes-btn button-invert" id='button-${i}'>+</button></li>`;
  }
  ulEl.innerHTML = liItem;
  addNoteListeners();
}

renderBookmarks(bookmarks);

function addNoteListeners() {
  let allNotesBtns = document.querySelectorAll(".notes-btn");
  allNotesBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
      addNotes(e);
    });
  });
}

function addNotes(e) {
  const btnId = e.target.id;
  const index = parseInt(btnId.slice(-1)); // get the number at end of button id from click event.
  bookmarks[index][1] = `new note for element ${index}`; // use that number to match the button to the element index in Bookmarks
  console.log(
    `adding a note to the ${index} index of the bookmarks tab, `,
    bookmarks[index]
  );
  renderBookmarks(bookmarks);
}

// NEXT STEPS:
// Update 'add' button so it pulls the current url instead of our fixed url
// Add in input once the + notes button is clicked, build out functionality
