const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addBtn.addEventListener("click", function () {
  bookmarks.push("www.example.com");
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks(bookmarks);
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  bookmarks = [];
  renderBookmarks(bookmarks);
});

function renderBookmarks(arr) {
  let liItem = "";
  for (let i = 0; i < arr.length; i++) {
    liItem += `<li>${arr[i]}</li>`;
  }
  ulEl.innerHTML = liItem;
}

renderBookmarks(bookmarks);
