import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output('cancelFromChild') cancelFromChild = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  cancel() {
    this.cancelFromChild.emit();
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => console.log(error));
  }

}
