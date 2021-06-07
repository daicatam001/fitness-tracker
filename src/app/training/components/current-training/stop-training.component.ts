import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
      <h1 mat-dialog-title>Are you sure?</h1>
      <mat-dialog-content>
          You've already got {{injectedData.progress}}%
      </mat-dialog-content>
      <mat-dialog-actions>
          <button mat-raised-button color="primary" [mat-dialog-close]="true">Yes</button>
          <button mat-raised-button [mat-dialog-close]="false">No</button>
      </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any) {
  }

}
