import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() public title: string = '';
  @Output() public openMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _router: Router){}

  public logout(): void{
    this._router.navigate(['login']);
    localStorage.clear();
  }
}
