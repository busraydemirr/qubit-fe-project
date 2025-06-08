import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { MenuItem } from '../../models/shared/menu-item.model';
import { ActivatedRoute, Router, RouterOutlet, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, SidenavMenuComponent, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public menuItems: MenuItem[] = [
    { label: 'Anasayfa', url: '/home', isActive: false },
    { label: 'Takvim', url: '/calendar', isActive: false },
    { label: 'Kasa İşlemleri', url: 'cash-transactions', isActive: false },
    { label: 'Cari İşlemler', url: 'current-accounts', isActive: false },
    {
      label: 'Çek/Senet İşlemleri',
      url: 'promissory-notes',
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
      url: 'banks-credits',
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
      url: 'invoices',
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
      url: 'orfiches',
      isActive: false,
      children: [
        {
          label: 'Alınan Siparişler',
          url: 'received-orfiches',
          isActive: false,
          depth: 1,
        },
        {
          label: 'Verilen Siparişler',
          url: 'placed-orfiches',
          isActive: false,
          depth: 1,
        },
      ],
    },
  ];
  public opened: boolean = false;
  public selectedMenuItem!: MenuItem;

  constructor(public route: Router) { }

  public ngOnInit(): void {
    const selected = this.menuItems.find(item => this.route.url.includes(item.url));
    if (selected) {
      selected.isActive = true;
      this.selectedMenuItem = selected!;
    }
    this.menuItems.forEach(item => {
      const selectedChild = item.children?.find(item => this.route.url.includes(item.url));
      if (selectedChild) {
        selectedChild.isActive = true;
        this.selectedMenuItem = selectedChild!;
      }
    });


    if (!this.selectedMenuItem) {
      this.menuItems[0].isActive = true;
      this.selectedMenuItem = this.menuItems[0];
      this.route.navigate(['home']);
    }
  }

  public openMenu(): void {
    this.opened = !this.opened;
  }

  public changeItem(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      return;
    }
    this.selectedMenuItem = item;
  }
}
