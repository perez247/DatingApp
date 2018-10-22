import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ToasterService } from 'src/app/_services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private toater: ToasterService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.galleryImages = this.loadImages();
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

  loadImages() {
    const imageUrls = [];
    for (let index = 0; index < this.user.photos.length; index++) {
      imageUrls.push({
        small: this.user.photos[index].url,
        medium: this.user.photos[index].url,
        big: this.user.photos[index].url,
        description: this.user.photos[index].description
      });
    }
    return imageUrls;
  }

}
