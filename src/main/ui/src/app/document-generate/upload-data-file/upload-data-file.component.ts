import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  DropDownModel,
  FileOutputFormat,
  OfferLetterField,
} from "src/app/model/dropdown.model";
import * as XLSX from "xlsx";
import { Template } from "src/app/model/Template";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "app-upload-data-file",
  templateUrl: "./upload-data-file.component.html",
  styleUrls: ["./upload-data-file.component.scss"],
})
export class UploadDataFileComponent implements OnInit {
  fileToUpload: File = null;
  workSheetNames: Array<DropDownModel> = new Array<DropDownModel>();
  showSheetList: boolean = false;
  selectedWorksheet: DropDownModel;
  selectedWorksheetName: string;
  mappedFields: Array<OfferLetterField> = new Array<OfferLetterField>();
  workBook: any;
  fileHeaders = [];
  excelJsonData: any;
  classes: any[];
  disableNext = true;
  submitted: boolean = false;
  @Input()
  templateModel: Template = new Template();

  @Output()
  uploadFileBtnClick: EventEmitter<Boolean> = new EventEmitter();

  @Output()
  generatedData: EventEmitter<Array<FileOutputFormat>> = new EventEmitter();

  @Output()
  excelColumnHeaders: EventEmitter<Array<DropDownModel>> = new EventEmitter();

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.classes = [
      { name: "First Class", code: "A", factor: 1 },
      { name: "Second Class", code: "B", factor: 2 },
      { name: "Third Class", code: "C", factor: 3 },
    ];
  }

  nextPage() {
    this.uploadFileBtnClick.emit(true);
  }

  onBasicUpload(event) {
    this.fileToUpload = event.files[0];
    this.readExcelFile(this.fileToUpload);
  }

  onWorkSheetChange() {
    let obj = this;
    obj.selectedWorksheetName = obj.selectedWorksheet.name;
    const sheet = obj.workBook.Sheets[obj.selectedWorksheetName];
    this.constructHeaders(obj.get_header_row(sheet));
    this.excelJsonData = XLSX.utils.sheet_to_json(sheet);
    obj.mappedFields = [];
    obj.generateTemplate();
  }

  constructHeaders(headers: any) {
    let obj = this;
    headers.forEach((head, index) => {
      let header = new DropDownModel();
      header.id = index;
      header.name = head;
      obj.fileHeaders.push(header);
    });
    obj.excelColumnHeaders.emit(obj.fileHeaders);
  }

  get_header_row(sheet) {
    let headers = [];
    let range = XLSX.utils.decode_range(sheet["!ref"]);
    let C,
      R = range.s.r;
    /* start in the first row * /
   /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      let cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];

      /* find the cell in the first row */
      let hdr = "UNKNOWN " + C; // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
    }
    return headers;
  }

  generateTemplate() {
    const dataToExport = this.sharedService.generateTemplateUsingExcelData(
      this.templateModel,
      this.excelJsonData
    );
    this.generatedData.emit(dataToExport);
    this.disableNext = false;
  }

  onFieldValueChange(field: OfferLetterField, fieldMap: DropDownModel) {
    if (fieldMap) {
      field.fieldValue = fieldMap.name;
    }
  }

  replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, "g"), replace);
  }

  readExcelFile(fileToUpload: File) {
    let workBook = null;
    const reader = new FileReader();
    const file = fileToUpload;
    let obj = this;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      obj.workSheetNames = [];
      workBook.SheetNames.forEach((name, index) => {
        let workSheet = new DropDownModel();
        workSheet.id = index;
        workSheet.name = name;
        obj.workSheetNames.push(workSheet);
      });
      obj.showSheetList = workBook.SheetNames.length > 0 ? true : false;
      obj.workBook = workBook;
    };
    reader.readAsBinaryString(file);
  }
}
