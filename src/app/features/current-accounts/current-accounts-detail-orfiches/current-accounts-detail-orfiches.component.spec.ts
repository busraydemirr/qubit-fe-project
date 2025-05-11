import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountsDetailOrfichesComponent } from './current-accounts-detail-orfiches.component';

describe('CurrentAccountsDetailOrfichesComponent', () => {
  let component: CurrentAccountsDetailOrfichesComponent;
  let fixture: ComponentFixture<CurrentAccountsDetailOrfichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountsDetailOrfichesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountsDetailOrfichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
