import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authlogout',
  templateUrl: './authlogout.component.html',
  styleUrls: ['./authlogout.component.css']
})
export class AuthlogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    try {
      console.log('try to logout');
      await this.authService._logoutAsync();
      console.log('logout done !');
      microsoftTeams.authentication.notifySuccess();

    } catch (error) {
      microsoftTeams.authentication.notifyFailure(error);
    }

  }

}
