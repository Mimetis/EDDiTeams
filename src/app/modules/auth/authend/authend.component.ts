import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authend',
  templateUrl: './authend.component.html',
  styleUrls: ['./authend.component.css']
})
export class AuthendComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.endLoginAdal();
  }

  endLoginAdal() {
    microsoftTeams.initialize();

    this.authService.handleEndLoginAsync();
  }

  endLoginVanilla() {
    // microsoftTeams.initialize();

    // localStorage.removeItem("simple.error");

    // let hashParams = this.utils.getHashParameters();

    // if (hashParams["error"]) {

    //   // Authentication/authorization failed
    //   localStorage.setItem("simple.error", JSON.stringify(hashParams));
    //   microsoftTeams.authentication.notifyFailure(hashParams["error"]);

    // } else if (hashParams["access_token"]) {

    //   // Get the stored state parameter and compare with incoming state
    //   let expectedState = localStorage.getItem("simple.state");
    //   if (expectedState !== hashParams["state"]) {

    //     // State does not match, report error
    //     localStorage.setItem("simple.error", JSON.stringify(hashParams));
    //     microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");

    //   } else {

    //     // Success -- return token information to the parent page.
    //     // Use localStorage to avoid passing the token via notifySuccess; instead we send the item key.
    //     let key = "simple.result";
    //     localStorage.setItem(key, JSON.stringify({
    //       idToken: hashParams["id_token"],
    //       accessToken: hashParams["access_token"],
    //       tokenType: hashParams["token_type"],
    //       expiresIn: hashParams["expires_in"]
    //     }));
    //     microsoftTeams.authentication.notifySuccess(key);
    //   }
    // } else {
    //   // Unexpected condition: hash does not contain error or access_token parameter
    //   localStorage.setItem("simple.error", JSON.stringify(hashParams));
    //   microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
    // }
  }

}
