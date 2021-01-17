import { Component, OnInit } from '@angular/core';
import { FbservisService} from '../services/fbservis.service';
import { StServisService} from '../services/st-servis.service';
import { Router} from '@angular/router';
import { File} from '../models/file';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  uid: string;
  userFiles: File[];
  files: FileList;
  private toast: ToastrService;

  constructor(public fbServis: FbservisService, public router: Router, public stServis: StServisService) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.uid = user.uid;
    this.username = user.username;
    this.FileList();
  }
  SignOut() {
    this.fbServis.SignOut().then(d => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });

  }
  FileList() {
    this.stServis.DosyaListele().snapshotChanges().subscribe(data => {
      this.userFiles = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.userFiles.push(y as File);
      });
    });
  }
  SelectFile(e) {
    this.files = e.target.files;
  }
  FileUpload() {
    const dosya = new File();
    dosya.file = this.files;
    this.stServis.DosyaYukleStorage(dosya).subscribe(
      p => {
        this.toast.success('Your file has been uploaded', 'successful');
      }, err => {
        this.toast.error('An error occured please try again or contact with administrator', 'Error');
      }
    );
  }
  DeleteFile(file: File) {
    this.stServis.DosyaSil(file);
  }
}
