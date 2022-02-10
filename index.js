const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  bookmarks.push(["www.example.com"]);
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
    liItem += `<li><a target="_blank" href="#">${arr[i]}</a><button class="notes-btn button-invert" id='button-${i}'>+</button></li>`;
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
  const index = parseInt(btnId.slice(-1));
  console.log(
    `adding a note to the ${index} index of the bookmarks tab, `,
    bookmarks[index]
  );
}
// declare allNotesBtns below wince they are only rendered after bookmarks are rendered.

// iterate over each button node, add an event listener to listen for clicks.

// allNotesBtns.forEach((btn, index) => {
//   btn.addEventListener("click", (e) => {
//     addNotes(e);
//   });
// });

// get the number at end of button id from click event.
// use that number to match the button to the element index in Bookmarks
// update bookmarks above so that every new bookmark is saved as an array instead of a string.
// add the new note as the second element in the matching array. ex, element one in bookmarks is an array with a url in the first position; this note will go in the second position of that array,

// To work on next - when I clear my buttons, then recreate, the addNotes function isn't running.
// Do I need to remove the 'allNotesBtns and the iteration after and build that into the render bookmarks function?
