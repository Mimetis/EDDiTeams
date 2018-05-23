import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // initialize teams
    microsoftTeams.initialize();
    // get context
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      console.log(context);
      this.setValidityState(true);
    });

    microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
      // Calculate host dynamically to enable local debugging
      let host = "https://" + window.location.host;

      microsoftTeams.settings.setSettings({
        contentUrl: host + "/",
        suggestedDisplayName: "EDDi Teams",
        removeUrl: host + "/remove",
        entityId: Math.random().toString()
      });

      saveEvent.notifySuccess();
    });

  }

  public setValidityState(val: boolean) {
    microsoftTeams.settings.setValidityState(val);
  }

}
