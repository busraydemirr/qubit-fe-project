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
    { label: 'Anasayfa', url: '/home', isActive: true },
    { label: 'Kasa İşlemleri', url: 'cash-transactions', isActive: false },
    { label: 'Cari İşlemler', url: 'current-accounts', isActive: false },
    {
      label: 'Çek/Senet İşlemleri',
      url: 'current-accounts',
      isActive: false,
      children: [
        {
          label: 'Müşteri Çekleri',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Pimak Çekleri',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
        },
      ],
    },
    {
      label: 'Banka/Kredi İşlemleri',
      url: 'current-accounts',
      isActive: false,
      children: [
        {
          label: 'Banka',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
          children: [
            {
              label: 'Şube ve Para Cinsi',
              url: 'current-accounts',
              isActive: false,
              depth: 2,
            },
          ],
        },
        {
          label: 'Kredi',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
          children: [
            {
              label: 'Ödenen Taksitler',
              url: 'current-accounts',
              isActive: false,
              depth: 2,
            },
            {
              label: 'Ödenecek Taksitler',
              url: 'current-accounts',
              isActive: false,
              depth: 2,
            },
          ],
        },
      ],
    },
    { label: 'Satış', url: 'current-accounts', isActive: false },
    { label: 'Alım Faturaları', url: 'current-accounts', isActive: false },
    {
      label: 'Siparişler',
      url: 'current-accounts',
      isActive: false,
      children: [
        {
          label: 'Ödenen Taksitler',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Ödenecek Taksitler',
          url: 'current-accounts',
          isActive: false,
          depth: 1,
        },
      ],
    },
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
