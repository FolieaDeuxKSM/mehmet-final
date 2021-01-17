import { File } from '../models/file';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StServisService {
  basePath = '/Dosyalar';
  constructor(
    public storage: AngularFireStorage,
    public db: AngularFireDatabase
  ) { }

  DosyaYukleStorage(dosya: File) {
    const tarih = new Date();
    const dosyaYol = this.basePath + '/' + dosya.name;
    const storageRef = this.storage.ref(dosyaYol);
    const yukleTask = this.storage.upload(dosyaYol, dosya.file);
    yukleTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          dosya.url = downloadURL;
          dosya.name = dosya.name;
          dosya.date = tarih.getTime().toString();
          this.DosyaVeriYaz(dosya);
        });
      })
    ).subscribe();
    return yukleTask.percentageChanges();
  }

  DosyaVeriYaz(dosya: File) {
    this.db.list(this.basePath).push(dosya);
  }

  DosyaListele() {
    return this.db.list(this.basePath);
  }
  DosyaSil(dosya: File) {
    this.DosyaVeriSil(dosya).then(() => {
      this.DosyaStorageSil(dosya);
    });
  }
  DosyaStorageSil(dosya: File) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(dosya.name).delete();
  }
  DosyaVeriSil(dosya: File) {
    return this.db.list(this.basePath).remove(dosya.key);
  }
}
