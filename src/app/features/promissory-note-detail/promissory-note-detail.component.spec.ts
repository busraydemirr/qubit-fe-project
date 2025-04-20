import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromissoryNoteDetailComponent } from './promissory-note-detail.component';

describe('PromissoryNoteDetailComponent', () => {
  let component: PromissoryNoteDetailComponent;
  let fixture: ComponentFixture<PromissoryNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromissoryNoteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromissoryNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
