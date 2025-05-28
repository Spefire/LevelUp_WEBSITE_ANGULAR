import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
  selector: 'notch',
  imports: [CommonModule, TagComponent],
  templateUrl: './notch.component.html',
  styles: ':host { display: contents }',
})
export class NotchComponent {
  public readonly heading = input.required<string>();
  public readonly badge = input.required<string | number>();
  public readonly palette = input<Palette | DecorativePalette>();
  public readonly tag = input<string>();
}
