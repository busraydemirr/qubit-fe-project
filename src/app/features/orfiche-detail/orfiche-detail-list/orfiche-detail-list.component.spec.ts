import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrficheDetailListComponent } from './orfiche-detail-list.component';

describe('OrficheDetailListComponent', () => {
  let component: OrficheDetailListComponent;
  let fixture: ComponentFixture<OrficheDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrficheDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrficheDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
