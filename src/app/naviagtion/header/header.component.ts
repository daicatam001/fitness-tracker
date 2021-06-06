import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {logout, selectIsAuthenticated} from '../../auth/store';
import {openNav} from '../../shared/store';
import {AppState} from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isAuth$ = this.store.pipe(select(selectIsAuthenticated));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onToggleSidenav(): void {
    this.store.dispatch(openNav());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
