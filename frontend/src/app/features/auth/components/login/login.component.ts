import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from '../../../../../../../shared/schema/LoginRequest';
import { AuthFacade } from '../../store/auth.facade';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = this.formBuilder.group({
    username: '',
    password: ''
  });

  faSignInAlt = faSignInAlt;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginRequest: LoginRequest = {
      username: this.loginFormGroup.value.username,
      password: this.loginFormGroup.value.password
    };

    this.authFacade.login(loginRequest);
  }
}
