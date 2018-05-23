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
  tableSelectedItems = [];
  tableIsMultiSelection = false;

  items = [
    { key: "1", value: "Option 1", isSelected: false },
    { key: "2", value: "Option 2", isSelected: false },
    { key: "3", value: "Option 3", isSelected: true },
    { key: "4", value: "Option 4", isSelected: false },
    { key: "5", value: "Option 5", isSelected: false },
  ];

  itemsHeaders = ["ID", "Option", "Selected ?"]

  ddlIsDisabled = false;

  onOptionSelected(itemSelected) {
    console.log(itemSelected);
  }

  onTableSelected(itemsSelected) {
    console.log(itemsSelected);
  }

  tableChangeMultiSelect() {
    this.tableIsMultiSelection = !this.tableIsMultiSelection;
  }
  tableChangeItems() {
    this.items = [
      { key: "4", value: "NEW Option 4", isSelected: true },
      { key: "6", value: "NEW Option 6", isSelected: false },
      { key: "7", value: "NEW Option 7", isSelected: false }];

    this.tableSelectedItems = [this.items[1]];

  }
  disableDropdown() {
    this.ddlIsDisabled = !this.ddlIsDisabled;
  }


  addDropdownItems() {
    this.items = [
      { key: "1", value: "Option 1", isSelected: false },
      { key: "2", value: "Option 2", isSelected: false },
      { key: "3", value: "Option 3", isSelected: false },
      { key: "4", value: "Option 4", isSelected: true },
      { key: "5", value: "Option 5", isSelected: false },
      { key: "6", value: "NEW Option 1", isSelected: false },
      { key: "7", value: "NEW Option 2", isSelected: false }
    ];
  }

  async ngOnInit() {
    try {

      microsoftTeams.initialize();

      this.tableSelectedItems = this.items.filter(i => parseInt(i.key) < 3);
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
