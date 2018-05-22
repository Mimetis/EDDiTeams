import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { AuthService } from '../modules/auth/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private sanitizer: DomSanitizer
  ) { }

  userName: string;
  photoUrl: SafeUrl;

  async ngOnInit() {
    try {

      microsoftTeams.initialize();

      // authenticate the user
      await this.getMeAsync();

    } catch (error) {
      console.log(error);
    }
  }

  private async getMeAsync() {
    let isAuth = await this.authService.loginSilentelyAsync();
    if (!isAuth) {
      this.userName = "not authenticated yet.";
    }
    else {
      let me = await this.graphService.getUserInformation();
      this.userName = me.displayName;
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

  async getPhotoAsync() {
    try {

      // get the profile from graph
      let unsafePhotoBlobUrl = await this.graphService.getUserPhotoAsync();

      console.log("get the unsafe blobUrl : ");
      console.log(unsafePhotoBlobUrl);

      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(unsafePhotoBlobUrl);

    } catch (error) {
      console.log(error);
    }
  }


  async getMembersAsync(): Promise<any> {

    return new Promise<any>((rs, rj) => {

      // Get the tab context, and use the information to navigate to Azure AD login page
      microsoftTeams.getContext(async (context) => {
        console.log(context);
        let members = await this.graphService.getMembersAsync(context.groupId)

        console.log(members);
      });

    });



  }

  async logoutAsync() {
    try {
      await this.authService.promptLogoutAsync();
      await this.getMeAsync();
    } catch (error) {

    }
  }


}
