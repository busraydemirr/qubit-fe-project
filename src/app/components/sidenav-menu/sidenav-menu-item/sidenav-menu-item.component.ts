import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/shared/menu-item.model';
import { MatActionList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-sidenav-menu-item',
  imports: [MatListItem, RouterLink, NgStyle, NgClass],
  templateUrl: './sidenav-menu-item.component.html',
  styleUrl: './sidenav-menu-item.component.scss',
})
export class SidenavMenuItemComponent {
  @Input() item!: MenuItem;
  @Input() menuItems!: MenuItem[];
  @Input() isChild: boolean = false;
  @Output() public menuItemChanged: EventEmitter<MenuItem> =
    new EventEmitter<MenuItem>();

  public changeMenuItem(item: MenuItem, isChild: boolean): void {
    this.menuItemChanged.emit(item);
    if (isChild) {
      this.menuItems.forEach((menuItem) => {
        menuItem.children?.forEach((child) => {
          child.isActive = false;

          child.children?.forEach((childChild) => {
            if (childChild === item) {
              child.isActive = true;
            }
            childChild.isActive = false;
          });
        });
      });
      item.isActive = true;
    } else {
      this.menuItems.forEach((menuItem) => {
        menuItem.isActive = false;
      });
      item.isActive = true;
    }
  }
}
