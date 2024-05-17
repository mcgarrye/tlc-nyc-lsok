import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { CreateGroupDTO } from './createGroup.dto';

// Load the credentials from the service account key file
export const credentials = {
  "type": "service_account",
  "project_id": "example",
  "private_key_id": "example",
  "private_key": "-----BEGIN PRIVATE KEY-----\nexample\n-----END PRIVATE KEY-----\n",
  "client_email": "example@example.iam.gserviceaccount.com",
  "client_id": "example",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/example.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Create a new JWT client using the credentials
const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Authorize and create a Google Sheets API instance
const sheets = google.sheets({ version: "v4", auth: client });

export async function append(data: CreateGroupDTO): Promise<string> {
    try {
        // Your spreadsheet ID
        const spreadsheetId = "example";

        const post =  await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: "Sheet1",
            valueInputOption: "RAW",
            requestBody: {
                values: [[
                    data.id,
                    data.groupSize,
                    data.primaryNumber,
                    data.primaryEmail,
                    data.date,
                    data.arrivalDate,
                    data.residence,
                    data.learnedOf,
                    data.madeAppointment
                ]]
            }
        })

        if (!post.data) {
            console.log("No data found.");
        } else {
            console.log(post.data);
            return post.data.toString()
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
