import { Component, OnInit } from '@angular/core';
import { FbservisService} from '../services/fbservis.service';
import { Router } from '@angular/router';
import {User} from '../models/User';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: User = new User();
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast: ToastrService
  ) { }
  ngOnInit() {
  }
  Register() {
    this.fbServis.Register(this.User).then(d => {
      console.log(d);
      d.user.updateProfile({
        displayName: this.User.username,
      }).then();
      localStorage.setItem('user', JSON.stringify(d.user));
      this.User.uid = d.user.uid;
      this.fbServis.AddUser(this.User);
      this.router.navigate(['login'], {queryParams: { registered: 'true' } });
      this.toast.success("Congratz!","Success");
    }, err => {
      this.toast.error("An error occured please try again or contact with administrator", "Error");    });
  }
}
