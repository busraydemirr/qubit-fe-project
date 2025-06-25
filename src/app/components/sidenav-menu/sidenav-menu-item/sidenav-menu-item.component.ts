import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MenuItem } from '../../../models/shared/menu-item.model';
import { MatListItem } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sidenav-menu-item',
  imports: [MatListItem, RouterLink, NgStyle, NgClass],
  templateUrl: './sidenav-menu-item.component.html',
  styleUrl: './sidenav-menu-item.component.scss',
})
export class SidenavMenuItemComponent implements OnDestroy {
  @Input() item!: MenuItem;
  @Input() menuItems!: MenuItem[];
  @Input() isChild: boolean = false;
  @Output() public menuItemChanged: EventEmitter<MenuItem> =
    new EventEmitter<MenuItem>();
    public subsink = new SubSink();

  constructor(private router: Router) {
    this.subsink.sink = this.router.events.subscribe((segs) => {

      if (segs?.type === 1) {
        // This is a NavigationEnd event
        this.menuItems.forEach(item => {
          if (item.children) {
            item.children?.forEach(child => {
              if (segs.url.includes(child.url)) {
                this.changeMenuItem(child, true);
              }
            });
          } else {
            if (segs.url.includes(item.url)) {
              this.changeMenuItem(item, false);
            }
          }

        });
      }
    });

  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public changeMenuItem(item: MenuItem, isChild: boolean): void {
    this.menuItemChanged.emit(item);
    if (isChild) {
      this.menuItems.forEach((menuItem) => {
        menuItem.isActive = false;
        menuItem.children?.forEach((child) => {
          child.isActive = false;

          if (child === item) {
            menuItem.isActive = true;
            child.isActive = true;
          }
        });
      });
    } else {
      this.menuItems.forEach((menuItem) => {
        menuItem.isActive = false;
      });
      item.isActive = true;
    }
  }

  public changeItem(item: MenuItem): void {
    this.menuItemChanged.emit(item);
  }

  public route(item: MenuItem): null | string {
    if (item.children && item.children.length > 0) {
      return null;
    }

    return item.url;
  }
}
