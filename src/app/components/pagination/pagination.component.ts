import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
  selector: 'pagination',
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './pagination.component.html',
  styles: ':host { display: contents }',
})
export class PaginationComponent implements OnInit {
  readonly nbByPage = input.required<number>();
  readonly items = input.required<any[]>();
  updateItems = output<{ min: number; max: number }>();

  public currentPage = 1;
  public maxPage = 1;
  public minResult = 1;
  public maxResult = 1;

  ngOnInit() {
    this.maxPage = Math.ceil(this.items().length / this.nbByPage());
    console.warn(this.maxPage, this.items().length, this.nbByPage());
    this.update();
  }

  update() {
    this.minResult = 1 + (this.currentPage - 1) * 10;
    this.maxResult = Math.min(10 + (this.currentPage - 1) * 10, this.items().length);
    this.updateItems.emit({
      min: this.minResult - 1,
      max: this.maxResult,
    });
  }

  previous() {
    this.currentPage--;
    this.update();
  }

  next() {
    this.currentPage++;
    this.update();
  }
}
