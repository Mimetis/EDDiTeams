import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { DialogComponent as Dialog } from "../modules/fabric/dialog.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HighlightComponent } from '../highlight/highlight.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  sample01: SafeHtml;

  @ViewChild("dialog01")
  dialog01: Dialog

  @ViewChild("apphl1")
  apphl1: HighlightComponent

  @ViewChild("apphl2")
  apphl2: HighlightComponent

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  ngAfterViewInit() {


    let data =
      `<fab-dialog #dialog01 dark isModal>
  <fab-dialog-title>All emails together</fab-dialog-title>
  <fab-dialog-content description='Are you sure you want to discard these changes?.'>
    <fab-checkbox value="check me"></fab-checkbox>
    <fab-checkbox value="check me as well"></fab-checkbox>
  </fab-dialog-content>
  <fab-dialog-actions>
    <fab-button (click)='dialog01.close()' buttonType='primary'>Save</fab-button>
    <fab-button (click)='dialog01.close()' style='margin-left: 5px;'>Cancel</fab-button>
  </fab-dialog-actions>
</fab-dialog>`;

    this.apphl1.value = data;

    this.apphl2.value =
      `function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) + class="\${cls}";
    } catch (e) {
    /* handle exception */
    }
    for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}

export  $initHighlight;`;


    // this.sample01 = this.sanitizer.bypassSecurityTrustHtml(data);
    // this.sample01 = PR.prettyPrintOne(data);
    // @ts-ignore;
    // this.sample01 = hljs.highlightBlock(data);
    // console.log(this.sample01);

    // $('div.code').each(function (i, block) {
    //   hljs.highlightBlock(block);
    // });

    // hljs.initHighlightingOnLoad();
  }


  ngAfterViewChecked() {

  }

}
