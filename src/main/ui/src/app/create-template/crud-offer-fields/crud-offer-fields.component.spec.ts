import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOfferFieldsComponent } from './crud-offer-fields.component';

describe('CrudOfferFieldsComponent', () => {
  let component: CrudOfferFieldsComponent;
  let fixture: ComponentFixture<CrudOfferFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudOfferFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudOfferFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
