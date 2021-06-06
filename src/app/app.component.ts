import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {closeNav, selectIsOpenNav} from './shared/store';
import {AppState} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isOpenNav$ = this.store.pipe(select(selectIsOpenNav));

  constructor(private store: Store<AppState>) {
  }

  onCloseNav(): void {
    this.store.dispatch(closeNav());
  }

}
