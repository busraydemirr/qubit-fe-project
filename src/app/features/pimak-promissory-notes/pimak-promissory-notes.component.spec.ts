import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PimakPromissoryNotesComponent } from './pimak-promissory-notes.component';

describe('PimakPromissoryNotesComponent', () => {
  let component: PimakPromissoryNotesComponent;
  let fixture: ComponentFixture<PimakPromissoryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PimakPromissoryNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PimakPromissoryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
