import { Injectable } from "@angular/core";
import { Template } from "./model/Template";
import { FileOutputFormat, OfferLetterField } from "./model/dropdown.model";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private sharedData: any;

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  generateTemplateUsingExcelData(
    templateModel: Template,
    excelJsonData: any
  ): FileOutputFormat[] {
    let template = templateModel.content;
    let dataToExport = new Array<FileOutputFormat>();
    let fileNo = 0;

    excelJsonData.forEach((element) => {
      let fileOutputData = new FileOutputFormat();
      fileOutputData.fileFieldMap = new Array<OfferLetterField>();
      fileNo = fileNo + 1;
      fileOutputData.fileNo = fileNo;
      let duplicateTemplate = template;
      templateModel.fields.forEach((f) => {
        let field = new OfferLetterField();
        field.fieldName = f.fieldName;
        let find = "{" + f.fieldName + "}";
        let replaceValue = element[f.fieldName];
        field.fieldValue = replaceValue ? replaceValue : "";
        fileOutputData.fileFieldMap.push(field);
        duplicateTemplate = this.replaceAll(
          duplicateTemplate,
          find,
          replaceValue
        );
      });
      fileOutputData.fileData = duplicateTemplate;
      dataToExport.push(fileOutputData);
    });
    return dataToExport;
  }

  generateTemplateUsingInputData(templateModel: Template): FileOutputFormat[] {
    let template = templateModel.content;
    let dataToExport = new Array<FileOutputFormat>();
    let fileNo = 0;
    let fileOutputData = new FileOutputFormat();
    fileOutputData.fileFieldMap = new Array<OfferLetterField>();
    fileOutputData.fileNo = fileNo;
    let duplicateTemplate = template;
    templateModel.fields.forEach((f) => {
      let field = new OfferLetterField();
      field.fieldName = f.fieldName;
      let find = "{" + f.fieldName + "}";
      let replaceValue = f.fieldValue;
      field.fieldValue = replaceValue ? replaceValue : "";
      fileOutputData.fileFieldMap.push(field);
      duplicateTemplate = this.replaceAll(
        duplicateTemplate,
        find,
        replaceValue
      );
    });
    fileOutputData.fileData = duplicateTemplate;
    dataToExport.push(fileOutputData);
    return dataToExport;
  }

  replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, "g"), replace);
  }
}
