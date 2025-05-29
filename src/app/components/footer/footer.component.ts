import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { PageTitles } from '@src/models/pages.model';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public pages = PageTitles;

  public isConnected: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _supabaseService: SupabaseService) {}

  public ngOnInit() {
    this._supabaseService.session$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(session => {
      this.isConnected = session ? true : false;
    });
  }
}
