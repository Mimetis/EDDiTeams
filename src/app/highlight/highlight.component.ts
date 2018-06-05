import { Component, OnInit, ContentChild, ElementRef, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare var hljs: any;

@Component({
  selector: 'app-hl',
  template: `
  <div class="ExampleCard" #_examplecard>
    <div class="ExampleCard-header">
    <div class="ExampleCard-toggleButtons ms-font-s">
    <button (click)='openClass()' class='ExampleCard-codeButton'>code</button>
    </div>    
      <span class="ExampleCard-title ms-font-s">{{title}}</span>
     
    </div>
    <div class="ExampleCard-code">
      <pre><code #_pre class="hljs" [innerHTML]='htmlValue'></code></pre>
    </div>
  </div>`
})
export class HighlightComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  @ViewChild('_examplecard')
  _examplecard: ElementRef;

  @ViewChild('_pre')
  _pre: ElementRef;

  @Input()
  value: string;

  @Input()
  title: string;

  htmlValue: SafeHtml;


  openClass() {
    let el = this._examplecard.nativeElement as HTMLElement;
    if (el.classList.contains('is-codeVisible'))
      el.classList.remove('is-codeVisible')
    else
      el.classList.add('is-codeVisible')
  }

  ngAfterViewInit() {


    setTimeout(() => {
      hljs.configure({
        useBR: true
      });

      let valuetoParse = this.value;

      if (valuetoParse == undefined || valuetoParse == "")
        return;

      let hljs_t = hljs.highlightAuto(valuetoParse);

      this.htmlValue = `<div>${hljs_t.value}</div>`;

    }, 0);


  }
}
