import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPromissoryNotesComponent } from './customer-promissory-notes.component';

describe('CustomerPromissoryNotesComponent', () => {
  let component: CustomerPromissoryNotesComponent;
  let fixture: ComponentFixture<CustomerPromissoryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPromissoryNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPromissoryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
