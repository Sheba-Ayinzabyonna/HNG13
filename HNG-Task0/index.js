// Function to update the current time in milliseconds
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Initial call and set interval for continuous update
updateTime();
// Update every second (1000ms) - a reasonable delta for this requirement
setInterval(updateTime, 1000);


//code for contact us page 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.querySelector(
    '[data-testid="test-contact-success"]'
  );
  const submitButton = document.querySelector(
    '[data-testid="test-contact-submit"]'
  );

  const formFields = [
    { id: "fullName", name: "Full name", minLength: 1 },
    { id: "email", name: "Email", minLength: 1 },
    { id: "subject", name: "Subject", minLength: 1 },
    { id: "message", name: "Message", minLength: 10 },
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** Shows error message and updates accessibility attributes. */
  function showError(inputElement, message) {
    const errorElementId =
      "error-" + inputElement.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    const errorElement = document.getElementById(errorElementId);

    if (errorElement) {
      errorElement.textContent = message;
      inputElement.classList.add("invalid");
      inputElement.setAttribute("aria-invalid", "true");
    }
  }

  /** Clears error message and resets accessibility attributes. */
  function clearError(inputElement) {
    const errorElementId =
      "error-" + inputElement.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    const errorElement = document.getElementById(errorElementId);

    if (errorElement) {
      errorElement.textContent = "";
      inputElement.classList.remove("invalid");
      inputElement.removeAttribute("aria-invalid");
    }
  }

  /** Validates a single form field. */
  function validateField(field) {
    const input = document.getElementById(field.id);
    const value = input.value.trim();
    clearError(input);
    let isValid = true;
    let errorMessage = "";

    // 1. All fields required
    if (value.length === 0) {
      errorMessage = `${field.name} is required.`;
      isValid = false;
    }

    // 2. Email validation
    else if (field.id === "email" && !emailRegex.test(value)) {
      errorMessage =
        "Please enter a valid email address (e.g., name@example.com).";
      isValid = false;
    }

    // 3. Message minimum length validation
    else if (
      field.id === "message" &&
      value.length > 0 &&
      value.length < field.minLength
    ) {
      errorMessage = `${field.name} must be at least ${field.minLength} characters long.`;
      isValid = false;
    }

    if (!isValid) {
      showError(input, errorMessage);
    }

    return isValid;
  }

  /** Validates all fields in the form. */
  function validateForm() {
    // Use .some() to check if *any* field is invalid
    let isFormValid = true;
    formFields.forEach((field) => {
      // Check if current field is valid and use logical AND assignment to maintain form validity state
      isFormValid = validateField(field) && isFormValid;
    });
    return isFormValid;
  }

  // Add real-time validation on blur
  formFields.forEach((field) => {
    const input = document.getElementById(field.id);
    input.addEventListener("blur", () => validateField(field));
    // Add input listener for message length feedback
    if (field.id === "message") {
      input.addEventListener("input", () => validateField(field));
    }
  });

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();
      if (successMessage.classList.add("hidden")) {
          ; // Hide any previous success message
      } else{
  successMessage.style.display="none";
}
    if (validateForm()) {
      // SUCCESS
      // In a real application, you would send data to a server here.
      form.reset();
        form.classList.add("hidden"); // Hide the form
        // successMessage.computedStyleMap.display="block"; // Show success message
        successMessage.style.display = "block"; ("hidden"); // Show success message
    //   successMessage.focus(); // Move focus to the success message
    } else {
      // FAILURE - Scroll to the first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
});

//navigation bar active link
document.addEventListener("DOMContentLoaded", function () {
  // 1. Get all the navigation links
  const navLinks = document.querySelectorAll(".nav-item a");

  // 2. Loop through each link and add a click event listener
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // A. Remove the 'active-nav-item' class from ALL links
      navLinks.forEach((item) => {
        item.classList.remove("active-nav-item");
      });

      // B. Add the 'active-nav-item' class to the clicked link
      this.classList.add("active-nav-item");
    });
  });
});

//About Me
  // Module, readable, and consistent initialization for icons
        document.addEventListener('DOMContentLoaded', function() {
            try {
                // This function searches the entire document for elements with the 'data-lucide' attribute
                // and replaces them with corresponding SVG icons.
                lucide.createIcons();
            } catch (error) {
                console.error("Lucide icon initialization failed:", error);
                // Gracefully degrade: the text content remains visible even if icons fail to load.
            }
        });