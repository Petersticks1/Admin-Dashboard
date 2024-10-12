// Function to send the email
function sendEmail() {
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  try {
      // Check if EmailJS has been initialized properly before attempting to send
      if (emailjs) {
          // Send the email using EmailJS
          emailjs
              .send("service_g6owd3j", "template_6sqgzhi", {
                  email: email,
                  subject: subject,
                  message: message,
              })
              .then(
                  function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                      alert("Email sent successfully!");
                  },
                  function (error) {
                      console.log("FAILED...", error);
                      alert("Failed to send email. Please try again.");
                  }
              );
      } else {
          console.error("EmailJS not initialized.");
          alert("EmailJS service is not properly initialized.");
      }
  } catch (error) {
      console.error("Error in sending email:", error);
      alert("An error occurred. Please try again.");
  }

  // Prevent form submission (so we can handle sending in JS)
  return false;
}
