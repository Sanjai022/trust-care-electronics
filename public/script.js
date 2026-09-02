const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");


// Open menu

menuButton.addEventListener("click", () => {

    sideMenu.classList.add("active");
    overlay.classList.add("active");

});


// Close menu

closeButton.addEventListener("click", () => {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

});


// Close menu when clicking outside

overlay.addEventListener("click", () => {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

});


// Close menu after selecting an option

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        sideMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

});


// Handle Quick Inquiry Form Submission

const inquiryForm = document.getElementById("inquiryForm");
const successMessage = document.getElementById("successMessage");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            product: document.getElementById("product").value,
            message: document.getElementById("message").value,
            timestamp: new Date().toLocaleString()
        };

        // Log the form data (for debugging)
        console.log("Form Submitted:", formData);

        // Create FormData object for Google Apps Script to prevent CORS issues
        const formPayload = new FormData();
        formPayload.append("name", formData.name);
        formPayload.append("phone", formData.phone);
        formPayload.append("email", formData.email);
        formPayload.append("product", formData.product);
        formPayload.append("message", formData.message);
        formPayload.append("timestamp", formData.timestamp);

        // Replace this URL with your deployed Google Apps Script Web App URL
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_jdkXfYT7TGahLgpf2Yz63-Cr8zTXR-uxqSBoik8yb_K1QsE-ok1-LvXhNV78PQTj/exec";

        // Optional: Change button text to show loading
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
        if (submitBtn) submitBtn.innerText = 'Submitting...';

        // Send data to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formPayload
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);

                // Clear the form
                inquiryForm.reset();

                // Show success message
                successMessage.style.display = "block";

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
            })
            .catch(error => {
                console.error("Error submitting to Google Sheets:", error);
                alert("There was an error submitting your form. Please try again later.");
            })
            .finally(() => {
                if (submitBtn) submitBtn.innerText = originalBtnText;
            });
    });
}