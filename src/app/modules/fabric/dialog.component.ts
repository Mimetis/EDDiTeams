import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, ViewChildren, QueryList, forwardRef, ContentChildren, Optional, ContentChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayComponent } from './overlay.component';
import { coerceBoolean } from './utils';

@Component({
    selector: 'fab-dialog-title',
    template: `<div class="ms-Dialog-title"><ng-content></ng-content></div>`,

})
export class DialogTitleComponent {

}


@Component({
    selector: 'fab-dialog-content',
    template: `<div class="ms-Dialog-content">
                <p class="ms-Dialog-subText">{{description}}</p>
                <ng-content></ng-content>
               </div>`,

})
export class DialogContentComponent {

    @Input()
    description;

}


@Component({
    selector: 'fab-dialog-actions',
    template: `<div class="ms-Dialog-actions">
                <ng-content></ng-content>
               </div>`,

})
export class DialogActionsComponent {

}

@Component({
    selector: 'fab-dialog',
    template: `<fab-overlay #_overlay [dark]='dark' (click)='_overlayClose()'></fab-overlay>
               <div class="ms-Dialog" #_dialog><ng-content></ng-content></div>`,

})
export class DialogComponent {
    private _isModal: boolean;
    private _dark: boolean;
    private _container: HTMLElement;

    /**  ge the content children */
    @ContentChild(forwardRef(() => DialogTitleComponent))
    private _titleRef: DialogTitleComponent;

    @ContentChild(forwardRef(() => DialogContentComponent))
    private _contentRef: DialogContentComponent;

    @ContentChild(forwardRef(() => DialogActionsComponent))
    private _actionsRef: DialogActionsComponent;

    @ViewChild("_overlay")
    private _overlay: OverlayComponent;

    @ViewChild("_dialog")
    private _dialogRef: ElementRef;
    private _dialog: HTMLElement;

    constructor(private element: ElementRef) {
        // get the container
        this._container = this.element.nativeElement.children[0];
    }

    /** Gets or Sets if the overlay is dark or not */
    @Input()
    get dark(): boolean {
        return this._dark;
    }

    set dark(v: boolean) {
        this._dark = coerceBoolean(v);
    }

    /** Gets or Sets if the overlay is dark or not */
    @Input()
    get isModal(): boolean {
        return this._isModal;
    }

    set isModal(v: boolean) {
        this._isModal = coerceBoolean(v);
    }


    ngOnInit() {

    }

    ngAfterViewInit() {
        this._dialog = this._dialogRef.nativeElement;


    }

    private _overlayClose(ev: Event) {

        if (this.isModal) {
            ev.stopPropagation();
            event.preventDefault();

            return;
        }

        this.close(ev);
    }

    public close(ev: Event): void {
        this._dialog.classList.remove("is-open");
        this._overlay.hide();
    }

    // ms-Dialog--blocking
    public open(): void {
        this._dialog.classList.add("is-open");
        this._overlay.show();
    }
}  