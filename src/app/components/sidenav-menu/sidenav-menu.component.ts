import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../models/shared/menu-item.model';
import { SidenavMenuItemComponent } from './sidenav-menu-item/sidenav-menu-item.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav-menu',
  imports: [
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    SidenavMenuItemComponent,
    NgClass,
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SidenavMenuComponent {
  @Input() public opened: boolean = false;
  @Input() public menuItems: MenuItem[] = [];
  @Output() public menuItemChanged: EventEmitter<MenuItem> =
    new EventEmitter<MenuItem>();

  public changeMenuItem(item: MenuItem): void {
    this.menuItemChanged.emit(item);
  }
}
