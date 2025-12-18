import { save, load } from "./localstorage.js";

const input = document.getElementById("bookmarkInput");
const addBtn = document.getElementById("addBookmarkBtn");
const list = document.getElementById("bookmarkList");

const STORAGE_KEY = "bookmarks";

const getBookmarks = () => load(STORAGE_KEY) ?? [];
const updateBookmarks = (bookmarks) => save(STORAGE_KEY, bookmarks);

const render = () => {
  const bookmarks = getBookmarks();
  list.innerHTML = "";
  bookmarks.forEach((url, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <a href="${url}" target="_blank">${url}</a>
  <div>
    <button class="edit">Редагувати посилання</button>
    <button class="delete">Видалити посилання</button>
  </div>
`;

    //
    li.querySelector(".edit").addEventListener("click", () => {
      const newURL = prompt("Нове посилання", url);
      if (!newURL) return;

      const updatedURL = [...bookmarks];
      updatedURL[index] = newURL;

      updateBookmarks(updatedURL);
      render();
    });

    //
    li.querySelector(".delete").addEventListener("click", () => {
      const updatedURL = bookmarks.filter((_, i) => i !== index);

      updateBookmarks(updatedURL);
      render();
    });
    list.appendChild(li);
  });
};

addBtn.addEventListener("click", () => {
  const url = input.value;
  if (!url) return;

  const bookmarks = getBookmarks();
  const updatedURL = [...bookmarks, url];

  updateBookmarks(updatedURL);
  render();

  input.value = "";
});

render();

// 
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

const STORAGE_KEY2 = "formData";

const savedData = load(STORAGE_KEY2);

if (savedData) {
  usernameInput.value = savedData.username ?? "";
  passwordInput.value = savedData.password ?? "";
}

saveBtn.addEventListener("click", () => {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  save(STORAGE_KEY2, data);
  alert("Дані збережено");
});
