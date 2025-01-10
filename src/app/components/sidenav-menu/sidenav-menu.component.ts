import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../models/menu-item.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  imports: [
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SidenavMenuComponent {
  @Input() public opened: boolean = false;
  @Input() public menuItems: MenuItem[] = [];
  @Output() public menuItemChanged: EventEmitter<MenuItem> =
    new EventEmitter<MenuItem>();

  public changeMenuItem(item: MenuItem): void {
    this.menuItemChanged.emit(item);
    this.menuItems.forEach((menuItem) => {
      menuItem.isActive = false;
    });
    item.isActive = true;
  }
}
