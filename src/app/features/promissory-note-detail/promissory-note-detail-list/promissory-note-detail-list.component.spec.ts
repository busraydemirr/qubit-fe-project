import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromissoryNoteDetailListComponent } from './promissory-note-detail-list.component';

describe('PromissoryNoteDetailListComponent', () => {
  let component: PromissoryNoteDetailListComponent;
  let fixture: ComponentFixture<PromissoryNoteDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromissoryNoteDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromissoryNoteDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
