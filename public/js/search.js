const searchBarHandler = async (event) => {
  event.preventDefault();

  const category = document
    .querySelector("#search-category")
    .value.trim()
    .toLowerCase();
  const query = document.querySelector("#search-bar").value.trim();

  if (query) {
    let searchPage = `/search?q=${query}`;
    if (category != "all") {
      searchPage = `/search/${category}?q=${query}`;
    }
    document.location = searchPage;
  }
};

document
  .querySelector("#search-button")
  .addEventListener("click", searchBarHandler);

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#search-button").click();
  }
});
