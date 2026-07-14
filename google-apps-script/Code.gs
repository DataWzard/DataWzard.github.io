const RECIPIENT_EMAIL = "jakestack91@gmail.com";
const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Resume Requests";
const DUPLICATE_WINDOW_SECONDS = 600;
function setup() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID.length < 20) {
    throw new Error("Replace PASTE_YOUR_GOOGLE_SHEET_ID_HERE with the ID from your Google Sheet URL, then run setup again.");
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(spreadsheet);
  const message = "Setup complete. Tracking sheet ready: " + sheet.getName();
  console.log(message);
  return message;
}

function doPost(e) {
  try {
    const parameters = (e && e.parameter) || {};

    // Silently accept likely bot submissions without sending or storing them.
    if (parameters.website) {
      return jsonResponse_({ ok: true });
    }

    const name = cleanText_(parameters.name, 100);
    const email = cleanText_(parameters.email, 160).toLowerCase();
    const note = cleanText_(parameters.note, 1200);
    const source = cleanText_(parameters.source, 500);

    if (!name || !isValidEmail_(email)) {
      return jsonResponse_({ ok: false, error: "A valid name and email are required." });
    }

    const cache = CacheService.getScriptCache();
    const duplicateKey = "resume-request-" + digest_(email);
    if (cache.get(duplicateKey)) {
      return jsonResponse_({ ok: true, duplicate: true });
    }

    const requestId = Utilities.getUuid();
    const receivedAt = new Date();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(spreadsheet);

    sheet.appendRow([
      receivedAt,
      safeCell_(requestId),
      safeCell_(name),
      safeCell_(email),
      safeCell_(note),
      safeCell_(source),
      "Pending",
      "",
    ]);

    const subject = "Resume request from " + name;
    const message = [
      "A new resume request was submitted through stacksanalytics.us.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Request ID: " + requestId,
      "Source: " + (source || "Not provided"),
      "",
      "Note:",
      note || "No note provided.",
      "",
      "Tap Reply to respond directly to " + name + ". Add a personal message and attach your private resume before sending.",
      "",
      "The request has been logged as Pending in the Resume Requests sheet.",
    ].join("\n");

    MailApp.sendEmail(RECIPIENT_EMAIL, subject, message, {
      name: "Jacob Stack Portfolio",
      replyTo: email,
    });

    cache.put(duplicateKey, "1", DUPLICATE_WINDOW_SECONDS);
    return jsonResponse_({ ok: true, requestId: requestId });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "The request could not be processed." });
  }
}

function getOrCreateSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received At",
      "Request ID",
      "Name",
      "Email",
      "Note",
      "Source",
      "Status",
      "Response Notes",
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    sheet.autoResizeColumns(1, 8);
  }

  return sheet;
}

function cleanText_(value, maximumLength) {
  return String(value || "").trim().slice(0, maximumLength);
}

function safeCell_(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function digest_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return Utilities.base64EncodeWebSafe(bytes).slice(0, 32);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}