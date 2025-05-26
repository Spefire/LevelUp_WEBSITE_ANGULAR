import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';
import { DungeonTableComponent } from '@src/pages/dungeons/dungeon-table/dungeon-table.component';

@Component({
  selector: 'dungeons-page',
  imports: [CommonModule, PageHeaderComponent, DungeonTableComponent, DatePipe],
  templateUrl: './dungeons.page.html',
})
export class DungeonsPage implements OnInit {
  public pages = PageTitles;

  public currentDate = new Date();
  public monday: Date;
  public sunday: Date;

  public ngOnInit() {
    const day = this.currentDate.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;

    this.monday = new Date(this.currentDate);
    this.monday.setDate(this.currentDate.getDate() + diffToMonday);
    this.monday.setHours(0, 0, 0, 0);

    this.sunday = new Date(this.monday);
    this.sunday.setDate(this.monday.getDate() + 6);
    this.sunday.setHours(23, 59, 59, 999);
  }
}
