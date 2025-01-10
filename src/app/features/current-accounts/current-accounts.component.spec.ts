import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountsComponent } from './current-accounts.component';

describe('CurrentAccountsComponent', () => {
  let component: CurrentAccountsComponent;
  let fixture: ComponentFixture<CurrentAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
