// Importing utility function for preloading images
import { preloadImages } from "./utils.js";


emailjs.init("W3wuNw5rHmwmLEoOk");

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default form submission

  // Optional: disable button to avoid resending
  form.querySelector("button").disabled = true;
  status.innerHTML = "Sending...";

  emailjs.sendForm('service_smdi5ij', 'template_pg47z1t', form)
    .then(() => {
      status.innerHTML = "Thank you for your message — I'll be in touch with you soon!";
      form.reset(); // clear form
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      status.innerHTML = "❌ Failed to send message. Please try again.";
    })
    .finally(() => {
      form.querySelector("button").disabled = false;
    });
});



const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact-me",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  
  tl.from("#contact-me", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });