import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRegister = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.isRegister = true;
  }

  cancel() {
    this.isRegister = false;
  }

}
