# Google Apps Script Setup — Community Sign-Up

Follow these steps to connect the sign-up form to Google Sheets.

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"Herb Café Community Members"**
3. In Row 1, add headers: `Timestamp` | `First Name` | `Surname` | `Email` | `Cell Number`

## Step 2: Add the Apps Script

1. In the spreadsheet, go to **Extensions → Apps Script**
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),           // Timestamp
    data.firstName,       // First Name
    data.surname,         // Surname
    data.email,           // Email
    data.cell             // Cell Number
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (💾) and name the project **"Community Form Handler"**

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ → select **Web app**
3. Set:
   - **Description**: Community sign-up handler
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. **Authorize** the app when prompted (click "Advanced" → "Go to..." if needed)
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

## Step 4: Update the Website

1. Open `src/js/community.js`
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` on line 9 with the URL you just copied
3. Save, commit, and push

## Downloading Members as Excel

1. Open the Google Sheet anytime
2. Go to **File → Download → Microsoft Excel (.xlsx)**
3. Done! You'll have all members with: Timestamp, First Name, Surname, Email, Cell Number
