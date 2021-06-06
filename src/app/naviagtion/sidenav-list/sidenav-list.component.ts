import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {logout, selectIsAuthenticated} from '../../auth/store';
import {closeNav} from '../../shared/store';
import {AppState} from '../../store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  isAuth$ = this.store.pipe(select(selectIsAuthenticated));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onCloseSidenav(): void {
    this.store.dispatch(closeNav());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
