import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { CreateGroupDTO } from './createGroup.dto';
import { SuccessDTO } from './success.dto';
import { InternalServerErrorException } from '@nestjs/common';

let CLIENT: JWT;
let SHEETS: any;

function initialize() {
    if (!CLIENT){
        // Create a new JWT client using the credentials
        CLIENT = new JWT({
            email: process.env.CLIENT_EMAIL,
            key: process.env.PRIVATE_KEY,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
    }

    if (!SHEETS){
        // Authorize and create a Google Sheets API instance
        SHEETS = google.sheets({ version: "v4", auth: CLIENT });
    }
}

export async function append(data: CreateGroupDTO): Promise<SuccessDTO> {
    try {
        initialize()
        
        // Your spreadsheet ID
        const spreadsheetId = process.env.SPREADSHEET_ID;

        const postGroupData =  await SHEETS.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: "Group Data",
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

        const groupMembers = data.groupMembers?.map((member) => [
            member.id,
            data.id,
            member.firstName,
            member.lastName,
            member.birthdate,
            member.age,
            member.sex,
            member.pregnant,
            member.countryOfOrigin,
            member.primaryLanguage,
            member.secondaryLanguage,
            member.headOfGroup
        ])

        const postGroupMembers =  await SHEETS.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: "Group Members",
            valueInputOption: "RAW",
            requestBody: {
                values: groupMembers
            }
        })

        if (postGroupData.status !== 200) {
            console.log("Group Data did not post.", postGroupData);
            throw new InternalServerErrorException(postGroupData);
        }

        if (postGroupMembers.status !== 200) {
            console.log("Group Members did not post.", postGroupMembers);
            throw new InternalServerErrorException(postGroupMembers);
        }

        console.log(postGroupData?.data);
        console.log(postGroupMembers?.data);
        return { success: true}
    } catch (error) {
        console.error("Error:", error);
        throw new InternalServerErrorException(error.errors.message);
    }
}
