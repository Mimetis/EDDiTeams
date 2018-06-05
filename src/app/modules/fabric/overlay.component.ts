import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, ViewChildren, QueryList, forwardRef, ContentChildren, Optional, ContentChild, ApplicationRef, Injector, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { appendNgContent } from '@angular/core/src/view/ng_content';
import { coerceBoolean } from './utils';
import { AppComponent } from '../../app.component';

// class="" 
@Component({
    selector: 'fab-overlay',
    template: `<div class="ms-Overlay">
                <ng-content></ng-content>
               </div>`,

})
export class OverlayComponent {
    appElementRef: any;
    private _isFullPage: boolean;
    private _dark: boolean;
    private _container: HTMLElement;

    @Input()
    get isFullPage(): boolean {
        return this._isFullPage;
    }

    set isFullPage(value: boolean) {
        this._isFullPage = coerceBoolean(value);
    }


    /** Gets or Sets if the overlay should be darker */
    @Input()
    get dark(): boolean {
        return this._dark;
    }

    set dark(value: boolean) {
        this._dark = coerceBoolean(value);
    }


    constructor(private element: ElementRef) {
    }

    ngOnInit() {
    }



    ngAfterViewInit() {
        // get the container
        this._container = this.element.nativeElement.children[0];

        if (this.dark) {
            this._container.classList.add('ms-Overlay--dark');
        }
    }

    public remove() {
        this.element.nativeElement.removeChild(this._container);
    }

    public show(): void {
        this._container.classList.add("is-visible");
        document.body.classList.add("ms-u-overflowHidden");
    }

    public hide(): void {
        this._container.classList.remove("is-visible");
        document.body.classList.remove("ms-u-overflowHidden");
    }



}  