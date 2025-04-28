import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailClcardComponent } from './invoice-detail-clcard.component';

describe('InvoiceDetailClcardComponent', () => {
  let component: InvoiceDetailClcardComponent;
  let fixture: ComponentFixture<InvoiceDetailClcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailClcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailClcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
