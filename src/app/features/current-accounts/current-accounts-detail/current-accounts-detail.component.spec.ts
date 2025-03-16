import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountsDetailComponent } from './current-accounts-detail.component';

describe('CurrentAccountsDetailComponent', () => {
  let component: CurrentAccountsDetailComponent;
  let fixture: ComponentFixture<CurrentAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
