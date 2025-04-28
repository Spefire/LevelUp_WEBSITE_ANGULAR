import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

@Component({
  selector: 'confirm-dialog',
  imports: [CommonModule, DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, DialogDismissDirective, ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  data = injectDialogData<{ heading?: string; content?: string }>();
  ref = injectDialogRef<boolean>();

  confirm() {
    this.ref.close(true);
  }
}
