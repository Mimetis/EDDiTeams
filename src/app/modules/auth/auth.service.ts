import { Injectable } from '@angular/core';
import * as randomNumber from 'random-number-csprng';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config = environment.v2Endpoint;

  constructor(private utils: UtilsService) { }

  async acquireTokenAsync(): Promise<string> {

    return new Promise<string>((rs, rj) => {

      // @ts-ignore
      let authContext = new AuthenticationContext(this.config);

      // See if there's a cached user and it matches the expected user
      let user = authContext.getCachedUser();

      if (!user)
        rj('no user defined, try to login before');

      // Get the id token (which is the access token for resource = clientId)
      authContext.acquireToken('https://graph.microsoft.com', (err, token) => {

        if (err) {
          return rj(err);
        }

        rs(token);

      });

    });
  }

  handleEndLoginAsync() {
    // @ts-ignore
    let authContext = new AuthenticationContext(this.config);

    if (authContext.isCallback(window.location.hash)) {
      authContext.handleWindowCallback(window.location.hash);
      if (authContext.getCachedUser()) {
        microsoftTeams.authentication.notifySuccess();
      } else {
        microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
      }
    }
  }


  async promptLoginAsync(): Promise<any> {
    return new Promise<any>((rs, rj) => {

      // launch popup
      microsoftTeams.authentication.authenticate({
        url: window.location.origin + "/auth",
        width: 650,
        height: 560,

        successCallback: (result) => {
          rs("successfully login in.");
        },

        failureCallback: (reason) => {
          if (reason === "CancelledByUser" || reason === "FailedToOpenWindow") {
            return rj("Login was blocked by popup blocker or canceled by user.");
          }
          return rj(reason);
        }
      })
    });
  }

  async _loginAsync(): Promise<boolean> {
    return new Promise<any>((rs, rj) => {

      // Get the tab context, and use the information to navigate to Azure AD login page
      microsoftTeams.getContext((context) => {

        // @ts-ignore
        let authContext = new AuthenticationContext(this.config);

        let upn = this._addUpn(context);

        this._ensureCachedUser(upn, authContext);

        authContext.login();

      });

    });
  }

  _ensureCachedUser(upn: any, authContext: any) {
    // See if there's a cached user and it matches the expected user
    let user = authContext.getCachedUser();

    if (user && upn) {
      if (user.userName !== upn) {
        // User doesn't match, clear the cache
        authContext.clearCache();
      }
    }
  }
  _addUpn(context: microsoftTeams.Context): string {
    // Try a silent auth before
    // Parse query parameters
    let queryParams = this.utils.getHashParameters();

    let upn = queryParams ? queryParams["upn"] : undefined;

    // Setup extra query parameters for ADAL
    // - openid and profile scope adds profile information to the id_token
    // - login_hint provides the expected user name
    if (context.upn) {
      upn = context.upn;
      this.config.extraQueryParameters += "&login_hint=" + encodeURIComponent(context.upn);
    }

    console.log("UPN is: " + upn);

    return upn;
  }

  async loginSilentelyAsync(): Promise<boolean> {
    return new Promise<boolean>((rs, rj) => {

      // Get the tab context, and use the information to navigate to Azure AD login page
      microsoftTeams.getContext((context) => {

        // @ts-ignore
        let authContext = new AuthenticationContext(this.config);

        let upn = this._addUpn(context);

        this._ensureCachedUser(upn, authContext);

        // Get the id token (which is the access token for resource = clientId)
        let token = authContext.getCachedToken(this.config.clientId);
        if (token) {
          return rs(true);
        }

        // No token, or token is expired
        authContext._renewIdToken((err, idToken) => {
          if (!err) {
            return rs(true);
          }

          return rs(false);
        });

      });

    });
  }


  async promptLogoutAsync() {
    return new Promise<any>((rs, rj) => {

      // launch popup
      microsoftTeams.authentication.authenticate({
        url: window.location.origin + "/authlogout",
        width: 650,
        height: 560,

        successCallback: (result) => {
          rs("successfully log out.");
        },

        failureCallback: (reason) => {
          if (reason === "CancelledByUser" || reason === "FailedToOpenWindow") {
            return rj("Login was blocked by popup blocker or canceled by user.");
          }
          return rj(reason);
        }
      })
    });
  }

  async _logoutAsync(): Promise<any> {

    return new Promise<any>((rs, rj) => {

      try {
        // @ts-ignore
        let authContext = new AuthenticationContext(this.config);

        authContext.logOut();

        rs(true);
      } catch (error) {
        rj(error);
      }


    });
  }

  // Login to Azure AD and get access to Microsoft Graph
  loginVanilla() {

    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/auth",
      width: 600,
      height: 535,
      successCallback: function (result) {
        console.log("Login succeeded: " + result);

        let data = localStorage.getItem(result);
        localStorage.removeItem(result);

        let tokenResult = JSON.parse(data);
        console.log(tokenResult.accessToken);
      },
      failureCallback: function (reason) {
        console.log("Login failed: " + reason);

      }
    });
  }


}
