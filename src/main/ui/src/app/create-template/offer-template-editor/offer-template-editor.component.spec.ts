import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTemplateEditorComponent } from './offer-template-editor.component';

describe('OfferTemplateEditorComponent', () => {
  let component: OfferTemplateEditorComponent;
  let fixture: ComponentFixture<OfferTemplateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTemplateEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTemplateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
