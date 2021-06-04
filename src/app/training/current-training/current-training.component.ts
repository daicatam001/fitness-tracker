import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training.component';
import {take} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter<void>();
  progress = 0;
  timer: number;
  step: number;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.doTraining();
  }

  doTraining(): void {
    this.step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, this.step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.exitTraining.emit();
      } else {
        this.doTraining();
      }
    });
  }
}
