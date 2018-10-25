import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { ToasterService } from './../../_services/toaster.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  intialUser: string;

  @ViewChild('editMember') editMember: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editMember.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private route: ActivatedRoute,
    private toater: ToasterService,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    },
    error => this.toater.error(error));
  }

  updateUser(form: NgForm) {
    // console.log(form.value);
    this.userService.updateUser(this.authService.authUser.nameid, form.value).subscribe(
      () => {
        this.toater.success('save made successfully');
        form.reset(this.user);
      }, error => this.toater.error(error)
    );
  }

}
