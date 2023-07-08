import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Template } from "../../model/Template";
import {
  FileOutputFormat,
  OfferLetterField,
} from "src/app/model/dropdown.model";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "app-user-input",
  templateUrl: "./user-input.component.html",
  styleUrls: ["./user-input.component.scss"],
})
export class UserInputComponent implements OnInit {
  dynamicUserInputForm: FormGroup;
  @Input()
  templateModel: Template = new Template();
  @Output()
  generatedData: EventEmitter<Array<FileOutputFormat>> = new EventEmitter();

  @Output()
  nextBtnClick: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.dynamicUserInputForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    const group: any = {};
    this.templateModel?.fields?.forEach((field) => {
      group[field.fieldName] = new FormControl("", Validators.required);
    });
    return this.formBuilder.group(group);
  }

  mapObjectToClass(obj): Array<OfferLetterField> {
    const fields = [];

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const field = new OfferLetterField();
        field.fieldName = key;
        field.fieldValue = obj[key];
        fields.push(field);
      }
    }

    return fields;
  }

  nextPage() {
    if (this.dynamicUserInputForm.valid) {
      const dynamicFields = this.mapObjectToClass(
        this.dynamicUserInputForm.value
      );
      this.templateModel.fields = dynamicFields;
      const dataToExport = this.sharedService.generateTemplateUsingInputData(
        this.templateModel
      );
      this.generatedData.emit(dataToExport);
      this.nextBtnClick.emit(true);
    }
  }
}
