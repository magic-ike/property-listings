import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id: any;
  listing: any;
  imageUrl: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // Get ID
    this.id = this.route.snapshot.params.id;

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(listing.path);
      storageRef.child(listing.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  onDeleteClick() {
    this.firebaseService.deleteListing(this.id);

    this.goBack();
    this.flashMessage.show('Listing deleted.', { cssClass: 'alert-success', timeout: 3000 });
  }

  goBack() {
    this.location.back();
  }

}
