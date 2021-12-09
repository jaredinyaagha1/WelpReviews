const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      let message = await response.json();
      if (message) {
        if (message.message === "email") {
          alert("Invalid email. Please correct and try again.");
        } else if (message.message === "alreadyExists") {
          alert("Email already registered. Please try again.");
        }
      }
    }
  }
};

document
  .querySelector(".sign-in-box")
  .addEventListener("submit", signupFormHandler);
