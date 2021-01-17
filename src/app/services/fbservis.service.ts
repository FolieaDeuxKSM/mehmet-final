import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '../models/file';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  kayitRef: AngularFireList<User> = null;
  uyeRef: AngularFireList<User> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
  }

  SignIn(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  SignOut() {
    return this.afAuth.signOut();
  }
  Register(uye: User) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.password);
  }

  AddUser(uye: User) {
    return this.uyeRef.push(uye);
  }
  ListFiles() {
    return this.kayitRef;
  }
}
