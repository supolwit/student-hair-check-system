Student Hair Check — Full Ready-to-Host (Static Frontend + Apps Script Backend)

WHAT'S INCLUDED
- index.html        (Login / routing)
- dashboard.html    (Teacher dashboard)
- student.html      (Student history)
- calendar.html     (Calendar preview page - static)
- styles.css
- api.js            (frontend API wrapper)
- app.js            (frontend logic & routing)
- backend/Code.gs   (Google Apps Script: API for Sheets + calendar PDF export)
- backend/calendar.html (GAS HTML template for PDF export)
- sample-sheets-structure.txt (instructions for Google Sheets tabs/headers)

QUICK START
1) Upload backend/Code.gs and backend/calendar.html into Google Apps Script attached to your Google Sheet.
   - Deploy as Web App (Execute as: Me, Who has access: Anyone)
   - Copy the Web App URL and paste into api.js (replace API_URL placeholder)

2) Prepare Google Sheet
   - Create a Google Sheet and add sheets: Inspections, Calendar, Students, Users, Records
   - See sample-sheets-structure.txt for headers.

3) Frontend hosting
   - This frontend is static and can be hosted on GitHub Pages.
   - Upload the frontend files (index.html, dashboard.html, student.html, styles.css, app.js, api.js)
   - OR build into a repo and push to GitHub. GitHub Pages will serve index.html.

SECURITY NOTE
- The Apps Script in this package is set to allow 'Anyone' access for simplicity. For production, implement authentication (Google Sign-In or restrict to domain).

