import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedOrficheComponent } from './received-orfiche.component';

describe('ReceivedOrficheComponent', () => {
  let component: ReceivedOrficheComponent;
  let fixture: ComponentFixture<ReceivedOrficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedOrficheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedOrficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
