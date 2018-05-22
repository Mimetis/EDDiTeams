import { Injectable } from '@angular/core';
import * as randomNumber from 'random-number-csprng';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // How many digits the verification code should be
  verificationCodeLength = 6;

  // How long the verification code is valid
  verificationCodeValidityInMilliseconds = 10 * 60 * 1000;       // 10 minutes

  // Regexp to look for verification code in message
  verificationCodeRegExp = /\b\d{6}\b/;


  config = environment.v1Endpoint;

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
        console.log('acquire token for graph');
        console.log(token);

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
        width: 600,
        height: 535,

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

        // Try a silent auth before
        // Parse query parameters
        let queryParams = this.utils.getHashParameters();

        let upn = queryParams["upn"];

        // Setup extra query parameters for ADAL
        // - openid and profile scope adds profile information to the id_token
        // - login_hint provides the expected user name
        if (context.upn) {
          upn = context.upn;
          this.config.extraQueryParameters += "&login_hint=" + encodeURIComponent(context.upn);
        }

        // Use a custom displayCall function to add extra query parameters to the url before navigating to it
        this.config.displayCall = (urlNavigate) => {
          if (urlNavigate) {
            if (this.config.extraQueryParameters) {
              urlNavigate += "&" + this.config.extraQueryParameters;
            }
            window.location.replace(urlNavigate);
          }
        }

        // @ts-ignore
        let authContext = new AuthenticationContext(this.config);

        // See if there's a cached user and it matches the expected user
        let user = authContext.getCachedUser();
        if (user && upn) {
          if (user.userName !== upn) {
            // User doesn't match, clear the cache
            authContext.clearCache();
          }
        }

        authContext.login();

      });

    });
  }

  async loginSilentelyAsync(): Promise<boolean> {
    return new Promise<boolean>((rs, rj) => {

      // Get the tab context, and use the information to navigate to Azure AD login page
      microsoftTeams.getContext((context) => {

        // Try a silent auth before
        // Parse query parameters
        let queryParams = this.utils.getHashParameters();

        let upn = queryParams["upn"];

        // Setup extra query parameters for ADAL
        // - openid and profile scope adds profile information to the id_token
        // - login_hint provides the expected user name
        if (context.upn) {
          upn = context.upn;
          this.config.extraQueryParameters += "&login_hint=" + encodeURIComponent(context.upn);
        }

        // @ts-ignore
        let authContext = new AuthenticationContext(this.config);

        // See if there's a cached user and it matches the expected user
        let user = authContext.getCachedUser();
        if (user && upn) {
          if (user.userName !== upn) {
            // User doesn't match, clear the cache
            authContext.clearCache();
          }
        }

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



  async logoutAsync(): Promise<any> {

    return new Promise<any>((rs, rj) => {

      // @ts-ignore
      let authContext = new AuthenticationContext(this.config);

      authContext.logOut();

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

  // Get the user's profile information from Microsoft Graph
  getUserProfile(accessToken) {
    // $.ajax({
    //   url: "https://graph.microsoft.com/v1.0/me/",
    //   beforeSend: function (request) {
    //     request.setRequestHeader("Authorization", "Bearer " + accessToken);
    //   },
    //   success: function (profile) {
    //     $("#profileDisplayName").text(profile.displayName);
    //     $("#profileJobTitle").text(profile.jobTitle);
    //     $("#profileMail").text(profile.mail);
    //     $("#profileUpn").text(profile.userPrincipalName);
    //     $("#profileObjectId").text(profile.id);
    //     $("#divProfile").css({ display: "" });
    //     $("#divError").css({ display: "none" });
    //   },
    //   error: function (xhr, textStatus, errorThrown) {
    //     console.log("textStatus: " + textStatus + ", errorThrown:" + errorThrown);
    //     $("#divError").text(errorThrown).css({ display: "" });
    //     $("#divProfile").css({ display: "none" });
    //   },
    // });
  }

  // Show error information
  handleAuthError(reason) {
    // $("#divError").text(reason).css({ display: "" });
    // $("#divProfile").css({ display: "none" });
  }

  // Clear all information in tab
  hideProfileAndError() {
    // $("#divError").text("").css({ display: "none" });
    // $("#divProfile").css({ display: "none" });
  }

}
