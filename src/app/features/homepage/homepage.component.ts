import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { MenuItem } from '../../models/shared/menu-item.model';
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
    { label: 'Takvim', url: '/calendar', isActive: false },
    { label: 'Kasa İşlemleri', url: 'cash-transactions', isActive: false },
    { label: 'Cari İşlemler', url: 'current-accounts', isActive: false },
    {
      label: 'Çek/Senet İşlemleri',
      url: 'customer-promissory-notes',
      isActive: false,
      children: [
        {
          label: 'Müşteri Çekleri',
          url: 'customer-promissory-notes',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Pimak Çekleri',
          url: 'pimak-promissory-notes',
          isActive: false,
          depth: 1,
        },
      ],
    },
    {
      label: 'Banka/Kredi İşlemleri',
      url: 'banks',
      isActive: false,
      children: [
        {
          label: 'Banka İşlemleri',
          url: 'banks',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Kredi İşlemleri',
          url: 'credits',
          isActive: false,
          depth: 1,
        },
      ],
    },
    {
      label: 'Faturalar',
      url: 'sales-invoices',
      isActive: false,
      children: [
        {
          label: 'Satış Faturaları',
          url: 'sales-invoices',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Alım Faturaları',
          url: 'purchase-invoices',
          isActive: false,
          depth: 1,
        },
      ],
    },
    {
      label: 'Siparişler',
      url: 'current-accounts',
      isActive: false,
      children: [
        {
          label: 'Alınan Siparişler',
          url: 'banks',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Verilen Siparişler',
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
