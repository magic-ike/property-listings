import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  id;
  title;
  owner;
  city;
  bedrooms;
  price;
  type;
  image;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.owner = listing.owner;
      this.city = listing.city;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
      this.type = listing.type;
    });
  }

  onEditSubmit() {
    const listing = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type
    };

    this.firebaseService.updateListing(this.id, listing);

    this.goBack();
    this.flashMessage.show('Listing updated.', { cssClass: 'alert-success', timeout: 3000 });
  }

  goBack() {
    this.location.back();
  }

}
