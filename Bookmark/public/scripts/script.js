const mainSection = document.getElementById("main-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const formSection = document.getElementById("form-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const categoryName = document.querySelector(".category-name");
const categoryList = document.querySelector("#category-list");
const categoryDropdown = document.querySelector("#category-dropdown");
const tname = document.querySelector("#name");
const url = document.querySelector("#url");
const closeFormBtn = document.querySelector("#close-form-button");
const addBookmarkBtnForm = document.querySelector("#add-bookmark-button-form");
const viewCategoryBtn = document.querySelector("#view-category-button");
const closeListBtn = document.querySelector("#close-list-button");
const deleteBookmarkBtn = document.querySelector("#delete-bookmark-button");

const getBookmarks = () => {
  try {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!Array.isArray(bookmarks)) {
      return [];
    }
    const isValid = bookmarks.every((bookmark) => {
      return (
        typeof bookmark === "object" &&
        bookmark !== null &&
        typeof bookmark.name === "string" &&
        typeof bookmark.category === "string" &&
        typeof bookmark.url === "string"
      );
    });
    return isValid ? bookmarks : [];
  } catch (e) {
    return [];
  }
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

addBookmarkBtn.addEventListener("click", () => {
  categoryName.textContent = categoryDropdown.value;
  displayOrCloseForm();
});
closeFormBtn.addEventListener("click", () => {
  displayOrCloseForm();
});

addBookmarkBtnForm.addEventListener("click", () => {
  const addingObj = {
    name: tname.value,
    category: categoryDropdown.value,
    url: url.value,
  };
  const bookmarks = getBookmarks();
  bookmarks.push(addingObj);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  tname.value = "";
  url.value = "";
  displayOrCloseForm();
});

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

viewCategoryBtn.addEventListener("click", () => {
  categoryName.textContent = categoryDropdown.value;
  displayOrHideCategory();
  modifyHTML();
});

closeListBtn.addEventListener("click", () => {
  bookmarkListSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
});

deleteBookmarkBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="bookmark"]:checked');

  if (!selected) return;

  const updatedBookmarks = getBookmarks().filter((bookmark) => {
    return !(
      bookmark.name === selected.value &&
      bookmark.category === categoryDropdown.value
    );
  });

  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

  modifyHTML();
});

const modifyHTML = () => {
  const bookmark = getBookmarks();
  const found = bookmark.filter((b) => b.category === categoryDropdown.value);
  if (!found || !found.length) {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    categoryList.innerHTML = found
      .map(
        (f) => `
      <label for="${f.name}">
        <a href="${f.url}">${f.name}</a>
      </label>
      <input
        type="radio"
        name="bookmark"
        id="${f.name}"
        value="${f.name}"
      >
    `,
      )
      .join("");
  }
};
