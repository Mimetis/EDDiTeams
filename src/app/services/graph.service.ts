import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthService } from '../modules/auth/auth.service';
import { Options } from '@microsoft/microsoft-graph-client/lib/src/common';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private authService: AuthService, private http: HttpClient) { }


  public static GetOptions(authService: AuthService): Options {
    return {

      authProvider: async (done) => {

        let access_token = await authService.acquireTokenAsync();

        console.log(access_token);

        if (!access_token)
          done('cant get token', undefined)
        else
          done(null, access_token); //first parameter takes an error if you can't get an access token
      }
    }
  }

  public async getUserInformation(): Promise<any> {
    try {

      var client = Client.init(GraphService.GetOptions(this.authService));

      let me = await client.api(`/me`).get();
      return me;

    } catch (error) {
      console.log(error);
      return ""
    }
  }


  public async getUserPhotoAsync(): Promise<any> {

    return new Promise<any>((rs, rj) => {

      try {

        var client = Client.init(GraphService.GetOptions(this.authService));

        let downloadStream = client.api(`https://graph.microsoft.com/v1.0/me/photo/$value`)
          .responseType('blob')
          .get((err, res, rawResponse) => {

            if (err) {
              console.log(err);
              return "";
            }

            const url = window.URL;
            const blobUrl = url.createObjectURL(rawResponse.xhr.response);
            rs(blobUrl);
          });
      } catch (error) {
        console.log(error);
        rj(undefined);
      }
    });

  }


  /**
   * wont work if no admin consent
   */
  public async getMembersAsync(groupId: string): Promise<any> {

    try {

      var client = Client.init(GraphService.GetOptions(this.authService));

      // let group = await client.api(`/groups/${groupId}/members`).version("beta").get();
      let group = await client.api(`/groups/${groupId}/members`).get();

      return group;

    } catch (error) {
      console.log(error);
    }
  }

}
