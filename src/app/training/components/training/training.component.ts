import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectCurrentTraining} from '@training/store';
import {AppState} from '@store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit {

  currentTraining$ = this.store.pipe(select(selectCurrentTraining));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

}
