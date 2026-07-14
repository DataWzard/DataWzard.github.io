# Resume request setup: Google Sheets + Gmail

This website now replaces the public resume download with a request form. Each valid request is recorded in Google Sheets and sends a Gmail notification whose Reply button addresses the requester.

## 1. Create the tracking sheet

1. In Google Sheets, create a blank spreadsheet named **Portfolio Resume Requests**.
2. Copy the spreadsheet ID from its address. It is the long value between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Keep this sheet private. It will contain names, email addresses, and notes.

## 2. Install the included Google script

1. In the spreadsheet, select **Extensions > Apps Script**.
2. Delete the sample function in the editor.
3. Open `google-apps-script/Code.gs` from the website source and copy all of it into the Apps Script editor.
4. Near the top, replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID from step 1.
5. Confirm `RECIPIENT_EMAIL` is `jakestack91@gmail.com`.
6. Click **Untitled project** at the top and name it **Portfolio Resume Requests**.
7. Save with **Ctrl+S**.
8. In the function menu near **Run**, choose `setup`.
9. Click **Run**. Approve access to Google Sheets and Gmail when Google asks.
10. Return to the spreadsheet and confirm a new **Resume Requests** tab exists with its header row.

Do not select and run `doPost` from the editor. It only runs when the website submits the form.

The script automatically creates a **Resume Requests** tab with these columns: Received At, Request ID, Name, Email, Note, Source, Status, and Response Notes.

## 3. Deploy the Google web app

1. In Apps Script, select **Deploy > New deployment**.
2. Choose **Web app** as the deployment type.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Select **Deploy**, review the requested permissions, and authorize the script.
6. Copy the deployed web app address ending in `/exec`. Use the deployed address, not a `/dev` test address.

Official reference: https://developers.google.com/apps-script/guides/web

## 4. Connect GitHub Pages

1. Open the website repository on GitHub.
2. Go to **Settings > Secrets and variables > Actions > Variables**.
3. Select **New repository variable**.
4. Set the name to `RESUME_REQUEST_URL`.
5. Paste the Google web app `/exec` address as the value and save it.
6. Copy the updated website source into the repository, commit it, and push it to `main`.
7. The existing GitHub Pages workflow will insert the Google web app address during the site build.

The web app address is not a password. Do not put Google passwords, OAuth tokens, or API keys in the repository.

## 5. Test the complete workflow

1. Open the deployed portfolio in a private browser window.
2. Select **Request resume**.
3. Submit a test using another email address you control.
4. Confirm a row appears in the **Resume Requests** sheet with status **Pending**.
5. Confirm the notification arrives at `jakestack91@gmail.com`.
6. Select **Reply** and confirm the requester is in the To field.
7. Write your personal note, attach the private resume from your device or Google Drive, and send it.
8. Change the Sheet status to **Responded** and optionally record a short response note.

## Important privacy and security notes

- The public PDF has been removed from the website package so visitors cannot bypass the request form.
- Keep your resume in a private location such as your device or private Google Drive.
- Keep the request spreadsheet private because it contains personal information.
- The form contains a hidden spam trap and suppresses repeat submissions from the same email for ten minutes.
- Google Apps Script and Gmail sending quotas still apply. If spam becomes a problem, add stronger bot protection before continuing to accept requests.
- If you change the Google script later, create a new deployed version and confirm the `/exec` deployment points to the new version.