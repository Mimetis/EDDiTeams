import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.useAdal();

  }


  useVanilla() {
    // try {
    //   microsoftTeams.initialize();

    //   // Get the tab context, and use the information to navigate to Azure AD login page
    //   microsoftTeams.getContext((context) => {
    //     // Generate random state string and store it, so we can verify it in the callback

    //     let state = this.utils.guid();

    //     localStorage.setItem("simple.state", state);
    //     localStorage.removeItem("simple.error");

    //     // not used, since we are in an implicit flow, with full javascript front end architecture
    //     let password = "eNXY1:-[dxgvxnPSJM7285%";

    //     // See https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-implicit
    //     // for documentation on these query parameters
    //     let queryParams = {
    //       client_id: "779f8391-b118-4368-b56f-1d31e0aaee5b",
    //       response_type: "id_token token",
    //       response_mode: "fragment",
    //       scope: "https://graph.microsoft.com/User.Read openid",
    //       redirect_uri: window.location.origin + "/authend",
    //       nonce: this.utils.guid(),
    //       state: state,
    //       // login_hint pre-fills the username/email address field of the sign in page for the user, 
    //       // if you know their username ahead of time.
    //       login_hint: context.upn,
    //     };

    //     // Go to the AzureAD authorization endpoint
    //     let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + this.utils.toQueryString(queryParams);
    //     window.location.assign(authorizeEndpoint);
    //   });

    // } catch{

    // }
  }

  async useAdal() {
    microsoftTeams.initialize();
    await this.authService._loginAsync();
  }

}
