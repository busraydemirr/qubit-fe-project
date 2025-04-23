import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrficheDetailComponent } from './orfiche-detail.component';

describe('OrficheDetailComponent', () => {
  let component: OrficheDetailComponent;
  let fixture: ComponentFixture<OrficheDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrficheDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrficheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
