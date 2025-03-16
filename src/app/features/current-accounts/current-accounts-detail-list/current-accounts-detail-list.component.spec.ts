import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountsDetailListComponent } from './current-accounts-detail-list.component';

describe('CurrentAccountsDetailListComponent', () => {
  let component: CurrentAccountsDetailListComponent;
  let fixture: ComponentFixture<CurrentAccountsDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountsDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountsDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
