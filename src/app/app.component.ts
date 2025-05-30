import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@src/components/footer/footer.component';
import { HeaderComponent } from '@src/components/header/header.component';
import { MenuComponent } from '@src/components/menu/menu.component';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isConnected: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _supabaseService: SupabaseService) {}

  public ngOnInit() {
    this._supabaseService.session$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(session => {
      this.isConnected = session ? true : false;
    });
  }
}
