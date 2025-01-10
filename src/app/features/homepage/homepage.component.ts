import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { MenuItem } from '../../models/menu-item.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, SidenavMenuComponent, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public menuItems: MenuItem[] = [
    { label: 'Kasa İşlemleri', url: 'cash-transactions', isActive: true },
    { label: 'Cari İşlemler', url: 'current-accounts', isActive: false },
  ];
  public opened: boolean = false;
  public selectedMenuItem: MenuItem = this.menuItems[0];

  public openMenu(): void {
    this.opened = !this.opened;
  }

  public changeItem(item: MenuItem): void {
    this.selectedMenuItem = item;
  }
}
