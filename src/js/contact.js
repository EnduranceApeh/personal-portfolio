import { loadComponent } from "./main.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log("contact.js loaded!");
  const submitBtn = document.getElementById("submit-btn");
  const closePopup = document.getElementById("closePop");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const popup = document.getElementById("popup");
  const statusText = document.getElementById("statusText");
  const popupMessage = document.getElementById("popupMessage");
  const popupIcon = document.getElementById("popupIcon");


  //load header into contact page
  (async function () {
    console.log("Before loading header");

    try {
      await loadComponent('/src/components/header.html', 'header');
      console.log("Header loaded successfully!");
    } catch (error) {
      console.error("Error loading header:", error);
    }
  })();



  function sendEmail() {
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_2au343a";
    const templateID = "template_hu5qg5j";

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            if (res.status === 200) {
                // Clear input fields
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("message").value = "";

                // Show success popup
                statusText.innerText = "Success!";
                popupMessage.innerText = "Your message has been sent successfully.";
                popupIcon.innerHTML = "✔️";
                popupIcon.classList.add("success-icon");

                popup.classList.add("show");

                statusText.style.color = "green";
                popupMessage.style.color = "green";
            }
        })
        .catch((err) => {
            console.log(err);
            // Show error popup
            statusText.innerText = "Error!";
            console.log(statusText)
            popupMessage.innerText = "Something went wrong. Please try again.";
            popupIcon.innerHTML = "❌"; // Cross icon
            popupIcon.classList.add("error-icon");
            
            popup.classList.add("show");
            //Add color to text
            statusText.style.color = "red";
            popupMessage.style.color = "red";
        });

    popup.style.display = "flex"; // Show popup
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        sendEmail();
    });
  }

  // Close popup
  function closePopupFunc() {
    popup.style.display = "none";
    popup.classList.remove("show");
    popupIcon.classList.remove("success-icon", "error-icon"); // Reset icon styles
  }

  if (closePopup) {
    closePopup.addEventListener("click", closePopupFunc);
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", closePopupFunc);
  }
})