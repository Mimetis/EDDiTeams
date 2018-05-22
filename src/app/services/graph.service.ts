import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  public async getUserInformation(): Promise<any> {
    try {

      var client = Client.init({

        authProvider: async (done) => {

          let access_token = await this.authService.acquireTokenAsync();

          if (!access_token)
            done('cant get token', undefined)
          else
            done(null, access_token); //first parameter takes an error if you can't get an access token
        }
      });

      let me = await client.api(`/me`).get();
      return me;

    } catch (error) {
      console.log(error);
      return ""
    }
  }


  public async getUserPhotoAsync(userId: string): Promise<string> {
    try {

      var client = Client.init({

        authProvider: async (done) => {

          let access_token = await this.authService.acquireTokenAsync();
          if (!access_token)
            done('cant get token', undefined)
          else
            done(null, access_token); //first parameter takes an error if you can't get an access token
        }
      });

      let downloadStream = client.api(`https://graph.microsoft.com/v1.0/me/photo/$value`)
        .responseType('blob')
        .get((err, res, rawResponse) => {

          if (err) {
            console.log(err);
            return "";
          }

          const url = window.URL;
          const blobUrl = url.createObjectURL(rawResponse.xhr.response);
          console.log(blobUrl);
          // document.getElementById("profileImg").setAttribute("src", blobUrl);
          return blobUrl
        });
    } catch (error) {
      console.log(error);
      return ""
    }
    return userId + '.png';
  }

}
