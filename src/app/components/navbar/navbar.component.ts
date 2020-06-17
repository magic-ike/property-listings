import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; import 'firebase/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
      public afAuth: AngularFireAuth,
      private router: Router,
      public flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.flashMessage.show('You successfully logged out.', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);
  }

}
