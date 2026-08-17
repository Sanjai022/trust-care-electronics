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

        // Save to localStorage (persistent on client side)
        let submissions = JSON.parse(localStorage.getItem("inquiries")) || [];
        submissions.push(formData);
        localStorage.setItem("inquiries", JSON.stringify(submissions));

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
    });
}