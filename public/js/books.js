async function submitReview(title, review) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify({
      title,
      review,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

function addButtonListeners() {
  $(".btn-success").each(function (index) {
    $(this).one("click", function () {
      let cardParent = $(this).parent().parent();
      cardParent.append("<form>");
      let reviewForm = cardParent.find("form");
      reviewForm.append(
        `<div class="form-group">
          <label>Review</label>
          <textarea class="form-control" placeholder="Leave your review here"></textarea>
      </div>`
      );
      reviewForm.append(
        `<button type="submit" class="btn btn-primary">Submit</button>`
      );
      let submitButton = reviewForm.find("button");
      submitButton.on("click", async function (event) {
        event.preventDefault();
        let title = cardParent.find(".card-title").text().trim();
        let review = reviewForm.find("textarea").val().trim();
        let response = await submitReview(title, review);
        if (response.ok) {
          console.log("Review saved");
        } else {
          let message = response.json();
          alert(message.message);
        }
      });
    });
  });
}

$(document).ready(addButtonListeners());
