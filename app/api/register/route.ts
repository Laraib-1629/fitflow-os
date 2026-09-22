import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SPREADSHEET_ID = '1IiyMbqKq-J60qmAhKQghuwWVysSfjbpeXeEJ0W-3_n0';
const SHEET_NAME = 'Sheet1';
const HEADERS = ['Timestamp', 'Name', 'Phone Number', 'Email', 'Studio Name', 'Location', 'City'];

async function getSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:G1`,
  });

  const firstRow = res.data.values?.[0];
  if (!firstRow || firstRow.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, number, email, studioName, location, city } = await req.json();

    if (!name || !number || !email || !studioName || !location || !city) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const sheets = await getSheet();
    await ensureHeaders(sheets);

    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[timestamp, name, number, email, studioName, location, city]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[register] Google Sheets error:', err);
    return NextResponse.json({ error: 'Failed to save registration.' }, { status: 500 });
  }
}
