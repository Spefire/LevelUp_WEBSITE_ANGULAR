import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ButtonComponent } from '@lucca-front/ng/button';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PageHeaderComponent,
    ButtonComponent,
    IconComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
