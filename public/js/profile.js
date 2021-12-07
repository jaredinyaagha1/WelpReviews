const newFormHandler = async (event) => {
  event.preventDefault();

  const bookName = document.querySelector("#book-name").value.trim();
  const starRating = document
    .querySelector("#star-rating")
    .value.trim();
  const bookReview = document.querySelector("#book-review").value.trim();

  if (bookName && starRating && bookReview) {
    const response = await fetch(`/api/projects`, {
      method: "POST",
      body: JSON.stringify({ bookName, starRating, bookReview }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create review");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete review");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);
