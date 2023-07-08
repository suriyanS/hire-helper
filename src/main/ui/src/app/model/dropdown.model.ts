export class DropDownModel {
    id: number;
    name: string;
}

export class FileOutputFormat {
    fileNo: number;
    fileFormat: string;
    fileName: string;
    uniqueFileName: string;
    fileNamePrefix: string;
    fileFieldMap: Array<OfferLetterField>;
    fileData: string;
}


export class OfferLetterField {
    id: number;
    fieldName: string;
    fieldCode: string;
    fieldValue: string
    fieldMap: DropDownModel; // only front end use
}

export const defaultTemplate = `{Your Name}
{Company Name}
{Street Address}
{City, ST ZIP Code}
{Date}
{Recipient Name}
{Street Address}
{City, ST ZIP Code}
Dear {Recipient Name}:
{Company Name} is excited to bring you on board as {job title}.
We’re just a few formalities away from getting down to work. Please take the time to review our offer. It includes important details about your compensation, benefits and the terms and conditions of your anticipated employment with {Company Name}.
{Company Name} is offering a {full time, part time, etc.} position for you as {job title}, reporting to {immediate manager/supervisor} starting on {proposed start date} at {workplace location}. Expected hours of work are {days of week and hours of work}.
In this position, {Company Name} is offering to start you at a pay rate of {Employee Salary} per {year, hour, annual salary, etc.}. You will be paid on a {weekly, monthly, etc} basis, starting {date of next pay period}.
As part of your compensation, we're also offering {If applicable, you’ll describe your bonus, profit sharing, commission structure, stock options, and compensation committee rules here}.
As an employee of {Company Name} you will be eligible for {briefly name benefits, such as health insurance, stock plan, dental insurance, etc.}.
Please indicate your agreement with these terms and accept this offer by signing and dating this agreement on or before {offer expiration date}.
Sincerely,
{Your Name}
{Title}`;
