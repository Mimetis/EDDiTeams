import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { AuthService } from '../modules/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private graphService: GraphService) { }

  userName: string;

  async ngOnInit() {
    try {

      microsoftTeams.initialize();

      // authenticate the user
      let isAuth = await this.authService.loginSilentelyAsync();

      if (!isAuth) {
        this.userName = "not authenticated yet."
      } else {
        let me = await this.graphService.getUserInformation();
        this.userName = me.displayName;
      }

    } catch (error) {
      console.log(error);
    }
  }

  async authenticateAsync() {
    try {

      // authenticate the user
      let isAuth = await this.authService.loginSilentelyAsync();

      if (!isAuth) {
        await this.authService.promptLoginAsync();
      }

      // get the profile from graph
      let me = await this.graphService.getUserInformation();

      this.userName = me.displayName;

    } catch (error) {
      console.log(error);
    }
  }
  async logoutAsync() {
    try {
      await this.authService.logoutAsync();
    } catch (error) {
    }
  }


}
