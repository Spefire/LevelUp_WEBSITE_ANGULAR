import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@src/components/footer/footer.component';
import { HeaderComponent } from '@src/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
