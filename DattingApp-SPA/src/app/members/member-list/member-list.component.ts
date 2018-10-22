import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { ToasterService } from '../../_services/toaster.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userServices: UserService, private toaster: ToasterService) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userServices.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => this.toaster.error(error));
  }

}
