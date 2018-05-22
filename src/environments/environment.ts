// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  v1Endpoint: {
    clientId: "bc20a015-0505-4857-b771-f2175ffb7f12",
    redirectUri: window.location.origin + "/authend",     // This should be in the list of redirect uris for the AAD app
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: "localStorage",
    extraQueryParameters: "",
    navigateToLoginRequestUrl: false,
    displayCall: undefined
  },
  v2Endpoint: {
    clientId: "779f8391-b118-4368-b56f-1d31e0aaee5b",
    redirectUri: window.location.origin + "/authend",     // This should be in the list of redirect uris for the AAD app
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "scope=openid+profile+https%3A%2F%2Fgraph.microsoft.com%2Fuser.read",
    displayCall: undefined
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
