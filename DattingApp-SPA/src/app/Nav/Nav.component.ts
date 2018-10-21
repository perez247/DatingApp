import { ToasterService } from './../_services/toaster.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {
  isExpanded = false;
  model: any = {};

  constructor(
    public authService: AuthService,
    private toaster: ToasterService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.toaster.success('logged in successfully');
        this.router.navigate(['/members']);
      },
      error => this.toaster.error(error),
      () => this.model = {}
      );
  }

  logout() {
    this.authService.logout();
    this.toaster.message('logged out successfully');
    this.router.navigate(['/home']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
