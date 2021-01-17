import { Component, OnInit } from '@angular/core';
import { File } from '../models/file';
import {FbservisService} from '../services/fbservis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  uid: string;
  files: File[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;
    this.username = user.displayName;
    this.FileList();
  }
  SignOut() {
    this.fbServis.SignOut().then(d => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });

  }
  // if userRole=1 then list all files
  // else list user own files
  FileList() {
    this.fbServis.ListFiles().snapshotChanges().subscribe(data => {
      this.files = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.files.push(y as File);
      });
    });
  }

  DeleteFile(kayit: File) {

  }
}
