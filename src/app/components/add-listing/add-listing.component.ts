import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  title: any;
  owner: any;
  city: any;
  bedrooms: any;
  price: any;
  type: any;
  image: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private location: Location,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onAddSubmit() {
    const listing = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
      image: this.image
    };

    this.firebaseService.addListing(listing);

    this.location.back();
    this.flashMessage.show('Listing added.', { cssClass: 'alert-success', timeout: 3000 });
  }

}
