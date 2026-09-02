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

        // Validate phone number (must contain at least 10 digits)
        const phoneInput = document.getElementById("phone").value;
        if (!/^\d{10}$/.test(phoneInput.replace(/\D/g, ''))) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

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

// Fetch configuration for contact details
fetch('/api/config')
    .then(response => {
        if (!response.ok) throw new Error("API not available");
        return response.json();
    })
    .then(config => {
        // Update Phone
        const phoneEl = document.getElementById('contact-phone');
        if (phoneEl && config.CONTACT_NUMBER) {
            phoneEl.href = `tel:${config.CONTACT_NUMBER}`;
            phoneEl.innerText = config.DISPLAY_CONTACT_NUMBER || config.CONTACT_NUMBER;
        }

        // Update Email
        const emailEl = document.getElementById('contact-email');
        if (emailEl && config.EMAIL_ADDRESS) {
            emailEl.href = `mailto:${config.EMAIL_ADDRESS}`;
            emailEl.innerText = config.EMAIL_ADDRESS;
        }

        // Update WhatsApp
        const waEl = document.getElementById('contact-whatsapp');
        if (waEl && config.CONTACT_NUMBER) {
            const waNumber = config.CONTACT_NUMBER.replace(/[^0-9]/g, '');
            waEl.href = `https://wa.me/${waNumber}`;
            waEl.innerText = config.DISPLAY_CONTACT_NUMBER || config.CONTACT_NUMBER;
        }

        // Update Map Location
        const mapLink = document.getElementById('contact-map-link');
        const mapBox = document.getElementById('contact-address-box');
        if (config.MAP_LOCATION_URL) {
            if (mapLink) mapLink.href = config.MAP_LOCATION_URL;
            if (mapBox) mapBox.setAttribute('onclick', `window.open('${config.MAP_LOCATION_URL}', '_blank')`);
        }

        // Create Floating WhatsApp Button dynamically
        if (config.CONTACT_NUMBER && !document.querySelector('.floating-whatsapp')) {
            const waNumber = config.CONTACT_NUMBER.replace(/[^0-9]/g, '');
            const floatingBtn = document.createElement('a');
            floatingBtn.href = `https://wa.me/${waNumber}`;
            floatingBtn.target = "_blank";
            floatingBtn.className = "floating-whatsapp";
            floatingBtn.innerHTML = `<svg viewBox="0 0 24 24" width="35" height="35" fill="white"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .12 5.36.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.93 11.93 0 0 0 5.74 1.74h.01c6.56 0 11.92-5.36 11.92-11.92 0-3.18-1.24-6.17-3.45-8.39ZM12.04 21.8h-.01a9.93 9.93 0 0 1-5.06-1.39L6.4 20.7l-1.17-.7A9.84 9.84 0 0 1 2.2 11.92a9.92 9.92 0 0 1 19.84 0c0 5.47-4.46 9.88-9.96 9.88Zm5.47-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.52-1.79-1.7-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.53.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.08c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z"/></svg>`;
            document.body.appendChild(floatingBtn);
        }
    })
    .catch(err => console.error('Failed to load contact config:', err));