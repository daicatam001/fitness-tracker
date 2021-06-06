import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthService} from '../../auth.service';
import {login, loginSuccess} from '../../store';
import {AppState} from '../../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    }));

    this.store.subscribe((state) => {
      console.log(state);
    });
  }

  onSubmit(): void {
    const {email, password} = this.loginForm.value;
    this.store.dispatch(login({email, password}));
  }

}
