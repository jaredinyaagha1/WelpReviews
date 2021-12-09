const cards = document.querySelectorAll(".card");

let buttonHandler = async (event) => {
  event.preventDefault();
  let readingStatus = event.target.textContent.trim();
  let buttonParentCard = event.target.parentElement.parentElement;
  let title = buttonParentCard.querySelector(".card-title").textContent.trim();
  let thumbnail = buttonParentCard.querySelector("img").src;
  let attrList = buttonParentCard
    .querySelector(".list-group")
    .querySelectorAll("li");
  let author = attrList[0].textContent.split(":")[1].trim();
  let rating = attrList[2].textContent.split(":")[1].trim();
  let totalRatings = attrList[3].textContent.split(":")[1].trim();

  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
      rating,
      totalRatings,
      readingStatus,
      thumbnail,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Book saved");
  } else {
    let message = await response.json();
    alert(message.message);
  }
};

cards.forEach((card) => {
  let buttons = card.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", buttonHandler);
  });
});
