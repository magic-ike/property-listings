import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  listings: Observable<any[]>;
  listing: Observable<any>;
  folder: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'listingImages';
    // this.listings = this.db.list<Listing>('listings').valueChanges(); // this won't work bc $key isn't set
    this.listings = this.db.list<Listing>('listings').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getListings() {
    return this.listings;
  }

  getListingDetails(id) {
    this.listing = this.db.object<Listing>('listings/' + id).valueChanges();
    return this.listing;
  }

  addListing(listing) {
    // Create root ref
    const storageRef = firebase.storage().ref();
    for (const selectedFile of [(document.getElementById('image').files[0])]) {
      const path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        this.db.list('listings').push(listing);
      });
    }
  }

  updateListing(id, listing) {
    this.db.list('listings').update(id, listing);
  }

  deleteListing(id) {
    this.db.list('listings').remove(id);
  }

}

interface Listing {
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
}
