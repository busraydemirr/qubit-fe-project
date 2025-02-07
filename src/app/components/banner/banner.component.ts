import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [MatIcon, NgIf],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() label: string = 'Label';
  @Input() subLabel: string = 'Sub Label';
  @Input() customClass: string = '';
  @Input() showBackButton: boolean = true;
  @Input() navigateUrl: string = '';

  constructor(private _router: Router) {}

  /**
   * Buttona navigateUrl ile atanmış url'e gider,
   * atanmış url yoksa browser'ın geri buttonu gibi çalışır.
   */
  public backNavigate(): void {
    this.navigateUrl
      ? this._router.navigate([`/${this.navigateUrl}`])
      : history.back();
  }
}
