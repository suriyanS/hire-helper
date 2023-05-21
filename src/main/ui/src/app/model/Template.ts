import { OfferLetterField } from "./dropdown.model";

export class Template{
    id: number;
    title:string;
    description:string;
    fields: Array<OfferLetterField>;
    content: string;
}