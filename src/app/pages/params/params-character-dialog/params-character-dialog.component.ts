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

import { Adjectives, Avatar, Character, getAvatarURL, Nouns } from '@src/models/character.model';
import { CharacterService } from '@src/services/character.service';

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

  public adjectives = Adjectives;
  public nouns = Nouns;

  public id: number;
  public avatar: Avatar;
  public avatarURL: string;
  public lastName: string;
  public firstName: string;
  public isAdmin: boolean;

  constructor(private _characterService: CharacterService) {}

  public ngOnInit() {
    this.id = this.data.character.id;
    this.avatar = this.data.character.avatar;
    this.lastName = this.data.character.lastName;
    this.firstName = this.data.character.firstName;
    this.isAdmin = this.data.character.isAdmin;
    this.update();
  }

  public async confirm() {
    const character: Character = {
      id: this.id,
      avatar: this.avatar,
      lastName: this.lastName,
      firstName: this.firstName,
      isAdmin: this.isAdmin,
    };
    const result = await this._characterService.saveCharacter(character);
    if (result) this.ref.close(true);
  }

  public update() {
    this.avatarURL = getAvatarURL(this.avatar);
  }
}
