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

// Helper to prefill and scroll to inquiry form from product cards
function inquireProduct(productName) {
    const inquirySection = document.getElementById("inquiry");
    const productSelect = document.getElementById("product");
    const messageBox = document.getElementById("message");
    const nameInput = document.getElementById("name");

    if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (productSelect) {
        // Try to match option by value or text
        let matched = false;
        for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].value === productName || productSelect.options[i].text.includes(productName)) {
                productSelect.selectedIndex = i;
                matched = true;
                break;
            }
        }
        if (!matched) {
            productSelect.value = "Battery";
        }
    }

    if (messageBox) {
        messageBox.value = `Hello Trust Care Electronics, I am interested in inquiring about the ${productName}. Please provide price quotation, warranty terms, and availability.`;
    }

    if (nameInput) {
        setTimeout(() => {
            nameInput.focus();
        }, 600);
    }
}

// ==========================================
// INVERTER & BATTERY LOAD CALCULATOR ENGINE
// ==========================================

const APPLIANCE_WATTS = {
    fan: 75,
    led: 15,
    tubelight: 40,
    tv: 100,
    router: 50,
    fridge: 200,
    custom: 0
};

let currentCalculation = {
    totalWatts: 0,
    backupHours: 3,
    inverterVa: 0,
    batteryAh: 0,
    inverterName: "",
    batteryName: ""
};

function initLoadCalculator() {
    const calcContainer = document.getElementById("load-calculator");
    if (!calcContainer) return;

    const backupSlider = document.getElementById("backupHours");
    const backupHoursVal = document.getElementById("backupHoursVal");
    const customWattsInput = document.getElementById("customWatts");
    const customQtyInput = document.getElementById("qty-custom");

    // Quantity buttons listeners
    const qtyButtons = calcContainer.querySelectorAll(".calc-qty-btn");
    qtyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const appliance = btn.dataset.appliance;
            const action = btn.dataset.action;
            const input = document.getElementById(`qty-${appliance}`);
            if (!input) return;

            let val = parseInt(input.value, 10) || 0;
            if (action === "plus") {
                val = Math.min(val + 1, 20);
            } else if (action === "minus") {
                val = Math.max(val - 1, 0);
            }
            input.value = val;
            calculateLoad();
        });
    });

    // Inputs direct change listeners
    const qtyInputs = calcContainer.querySelectorAll(".calc-qty-input");
    qtyInputs.forEach(input => {
        input.addEventListener("input", () => {
            let val = parseInt(input.value, 10);
            if (isNaN(val) || val < 0) val = 0;
            if (val > 20) val = 20;
            input.value = val;
            calculateLoad();
        });
    });

    if (customWattsInput) {
        customWattsInput.addEventListener("input", calculateLoad);
    }

    if (backupSlider) {
        backupSlider.addEventListener("input", (e) => {
            const hours = parseFloat(e.target.value);
            if (backupHoursVal) {
                backupHoursVal.innerText = `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
            }
            calculateLoad();
        });
    }

    // Initial calculation
    calculateLoad();
}

function calculateLoad() {
    const backupSlider = document.getElementById("backupHours");
    const backupHours = backupSlider ? parseFloat(backupSlider.value) || 3 : 3;

    let totalWatts = 0;

    // Loop through appliance wattages
    for (const [appliance, watts] of Object.entries(APPLIANCE_WATTS)) {
        if (appliance === "custom") {
            const customWatts = parseFloat(document.getElementById("customWatts")?.value) || 0;
            const customQty = parseInt(document.getElementById("qty-custom")?.value, 10) || 0;
            totalWatts += (customWatts * customQty);
        } else {
            const qtyInput = document.getElementById(`qty-${appliance}`);
            const qty = parseInt(qtyInput?.value, 10) || 0;
            totalWatts += (watts * qty);
        }
    }

    // Safety margin 25% and Power Factor 0.8
    const requiredVaRaw = totalWatts > 0 ? (totalWatts / 0.8) * 1.25 : 0;
    const requiredVa = Math.ceil(requiredVaRaw / 50) * 50;

    // Battery calculation: (Total Watts * Hours) / (12V * 0.8 Efficiency)
    const requiredAhRaw = totalWatts > 0 ? (totalWatts * backupHours) / (12 * 0.8) : 0;
    const requiredAh = Math.ceil(requiredAhRaw);

    // Product Mapping
    let inverterName = "Microtek Pure Sinewave 700VA";
    let inverterDesc = "Ideal for essential lights & fans";
    if (requiredVa > 1650) {
        inverterName = "Microtek Heavy Duty 2200 (24V Dual Battery)";
        inverterDesc = "Heavy commercial & entire household backup";
    } else if (requiredVa > 1200) {
        inverterName = "Microtek Merlyn 1650 (1600VA / 12V)";
        inverterDesc = "Premium high-load sinewave for luxury homes";
    } else if (requiredVa > 950) {
        inverterName = "Microtek Super Power 1250 (1100VA / 12V)";
        inverterDesc = "Recommended for 3 BHK / multiple fans & TV";
    } else if (requiredVa > 650) {
        inverterName = "Microtek Luxe 1050 (1000VA Sinewave)";
        inverterDesc = "Best-selling reliable home inverter";
    }

    let batteryName = "Microtek M1652424ST NEW (150Ah/165Ah)";
    let batteryType = "Short Tubular • 48 Months Warranty";
    if (requiredAh > 195) {
        batteryName = "Microtek M210002424STT NEW (210Ah Jumbo)";
        batteryType = "Jumbo Tall Tubular • 48 Months Warranty";
    } else if (requiredAh > 165) {
        batteryName = "Microtek M1852424ST NEW (185Ah Tall Tubular)";
        batteryType = "Tall Tubular • 48 Months Warranty (Top Pick)";
    } else if (requiredAh <= 110 && totalWatts > 0) {
        batteryName = "Microtek 100Ah - 135Ah Tubular Battery";
        batteryType = "Standard Tubular • 36-48 Months Warranty";
    }

    currentCalculation = {
        totalWatts,
        backupHours,
        inverterVa: requiredVa,
        batteryAh: requiredAh,
        inverterName,
        batteryName
    };

    // Update UI elements
    const totalWattsEl = document.getElementById("calc-total-watts");
    const requiredVaEl = document.getElementById("calc-required-va");
    const requiredAhEl = document.getElementById("calc-required-ah");
    const inverterNameEl = document.getElementById("calc-inverter-name");
    const inverterDescEl = document.getElementById("calc-inverter-desc");
    const batteryNameEl = document.getElementById("calc-battery-name");
    const batteryTypeEl = document.getElementById("calc-battery-type");
    const calcEmptyHint = document.getElementById("calc-empty-hint");
    const calcResultsCard = document.getElementById("calc-results-card");

    if (totalWattsEl) totalWattsEl.innerText = `${totalWatts} W`;
    if (requiredVaEl) requiredVaEl.innerText = totalWatts > 0 ? `${requiredVa} VA` : "0 VA";
    if (requiredAhEl) requiredAhEl.innerText = totalWatts > 0 ? `${requiredAh} Ah` : "0 Ah";

    if (inverterNameEl) inverterNameEl.innerText = inverterName;
    if (inverterDescEl) inverterDescEl.innerText = inverterDesc;
    if (batteryNameEl) batteryNameEl.innerText = batteryName;
    if (batteryTypeEl) batteryTypeEl.innerText = batteryType;

    if (calcEmptyHint && calcResultsCard) {
        if (totalWatts === 0) {
            calcEmptyHint.style.display = "block";
            calcResultsCard.classList.add("is-empty");
        } else {
            calcEmptyHint.style.display = "none";
            calcResultsCard.classList.remove("is-empty");
        }
    }
}

// 1-Click Action: Scroll to Inquiry Form with Auto-filled Combo
function quoteCalculatorCombo() {
    const inquirySection = document.getElementById("inquiry") || document.querySelector(".inquiry-section");
    const productSelect = document.getElementById("product");
    const messageBox = document.getElementById("message");
    const nameInput = document.getElementById("name");

    if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (productSelect) {
        productSelect.value = "Other";
        // Check if there is an inverter or combo option
        for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].text.toLowerCase().includes("inverter") || productSelect.options[i].value === "Inverter") {
                productSelect.selectedIndex = i;
                break;
            }
        }
    }

    if (messageBox) {
        const { totalWatts, backupHours, inverterName, batteryName } = currentCalculation;
        messageBox.value = `Hello Trust Care Electronics, I calculated my power requirement as ${totalWatts}W for ${backupHours} hours backup. Please provide quotation, discount, and doorstep installation in Chennai for:\n• Inverter: ${inverterName}\n• Battery: ${batteryName}`;
    }

    if (nameInput) {
        setTimeout(() => {
            nameInput.focus();
        }, 600);
    }
}

// 1-Click Action: Launch WhatsApp with Auto-filled Combo
function whatsappCalculatorCombo() {
    const { totalWatts, backupHours, inverterName, batteryName } = currentCalculation;
    const phoneEl = document.getElementById('contact-phone');
    const rawPhone = phoneEl ? phoneEl.innerText.replace(/[^0-9]/g, '') : "919884087878";
    const waNumber = rawPhone.startsWith("91") ? rawPhone : `91${rawPhone}`;

    const text = encodeURIComponent(
        `Hello Trust Care Electronics, I calculated my power backup requirements on your website:\n` +
        `• Total Load: ${totalWatts}W\n` +
        `• Desired Backup: ${backupHours} Hours\n` +
        `• Recommended Inverter: ${inverterName}\n` +
        `• Recommended Battery: ${batteryName}\n\n` +
        `Please share pricing, best discount, and delivery/installation details in Chennai.`
    );

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
}

// Auto-run calculator initialization when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoadCalculator);
} else {
    initLoadCalculator();
}