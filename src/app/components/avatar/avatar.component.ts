import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { Avatar } from '@src/models/character.model';

@Component({
  selector: 'avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  public readonly avatar = input.required<Avatar>();
}
