// Vercel Serverless Function: GET /api/config
// Provides contact details, WhatsApp number, and showroom map URL from environment variables

module.exports = (req, res) => {
    // Set CORS headers so API can be accessed from any preview or custom domain
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Return environment variables with robust fallback defaults
    res.status(200).json({
        CONTACT_NUMBER: process.env.CONTACT_NUMBER || "+919884087878",
        DISPLAY_CONTACT_NUMBER: process.env.DISPLAY_CONTACT_NUMBER || "+91 9884087878",
        EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || "trustcareelectronics@gmail.com",
        MAP_LOCATION_URL: process.env.MAP_LOCATION_URL || "https://maps.app.goo.gl/U5BKf7q1mpoMP46T9"
    });
};
