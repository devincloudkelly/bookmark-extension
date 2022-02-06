const addBtn = document.querySelector("#add-btn");
const ulEl = document.querySelector("#ul-el");

let bookmarks = [];

addBtn.addEventListener("click", function () {
  bookmarks.push("www.example.com");
  console.log(bookmarks);
  renderBookmarks();
});

function renderBookmarks() {
  let liItem = "";
  for (let i = 0; i < bookmarks.length; i++) {
    liItem += `<li>${bookmarks[i]}</li>`;
  }
  ulEl.innerHTML = liItem;
}
