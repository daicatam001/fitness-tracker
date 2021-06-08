import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {selectTrainingProgress, stopTraining} from '../../store';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentTrainingComponent implements OnInit {
  progress$ = this.store.select(selectTrainingProgress);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onStop(): void {
    this.store.dispatch(stopTraining());
  }
}
