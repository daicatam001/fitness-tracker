import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training.component';
import {take} from 'rxjs/operators';
import {TrainingService} from '../../training.service';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {selectTrainingProgress} from '../../store';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTrainingComponent implements OnInit {
  progress$ = this.store.select(selectTrainingProgress);

  constructor(private dialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onStop(): void {
    // clearInterval(this.timer);
    // const dialogRef = this.dialog.open(StopTrainingComponent, {
    //   data: {
    //     progress: this.progress
    //   }
    // });
    // dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
    //   if (result) {
    //     this.exitTraining.emit();
    //   } else {
    //     this.doTraining();
    //   }
    // });
  }
}
