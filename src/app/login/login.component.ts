import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { partitionArray } from '@angular/compiler/src/util';
import { FbservisService} from '../services/fbservis.service';
import {ToastrService} from 'ngx-toastr';
import { User} from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User: User = new User();
  private toast: ToastrService;
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  Login() {
    this.fbServis.SignIn(this.User.mail, this.User.password).then(d => {
      localStorage.setItem('user', JSON.stringify(d.user));
      this.router.navigate(['/']);
    }, err => {
      this.toast.error('An error occured please try again or contact with administrator', 'Error'); });
  }
}
