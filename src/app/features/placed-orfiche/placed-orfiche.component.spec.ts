import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedOrficheComponent } from './placed-orfiche.component';

describe('PlacedOrficheComponent', () => {
  let component: PlacedOrficheComponent;
  let fixture: ComponentFixture<PlacedOrficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacedOrficheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacedOrficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
