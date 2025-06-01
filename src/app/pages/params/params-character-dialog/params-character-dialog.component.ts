import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
import {
  DialogComponent,
  DialogContentComponent,
  DialogDismissDirective,
  DialogFooterComponent,
  DialogHeaderComponent,
  injectDialogData,
  injectDialogRef,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberInputComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

import { Avatar, Character, getAvatarURL } from '@src/models/character.model';
import { adjectives, nouns } from '@src/models/character.options';

@Component({
  selector: 'params-character-dialog',
  imports: [
    CommonModule,
    FormsModule,
    DialogComponent,
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogDismissDirective,
    FormFieldComponent,
    CheckboxInputComponent,
    NumberInputComponent,
    LuSimpleSelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './params-character-dialog.component.html',
})
export class ParamsCharacterDialogComponent implements OnInit {
  public data = injectDialogData<{ character: Character }>();
  public ref = injectDialogRef<boolean>();

  public adjectives = adjectives;
  public nouns = nouns;

  public avatar: Avatar;
  public avatarURL: string;
  public lastName: string;
  public firstName: string;

  public ngOnInit() {
    this.lastName = this.data.character.lastName;
    this.firstName = this.data.character.firstName;
    this.avatar = this.data.character.avatar;
    this.update();
  }

  public confirm() {
    this.ref.close(true);
  }

  public update() {
    this.avatarURL = getAvatarURL(this.avatar);
  }
}
