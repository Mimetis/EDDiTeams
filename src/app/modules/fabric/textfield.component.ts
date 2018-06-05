import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceBoolean, mixinRequired, mixinDisabled, mixin } from './utils';


// creating a mixin with isRequired and isDisabled
const IsRequiredAndIsDisabled = mixinRequired(mixinDisabled(mixin()));

@Component({
    selector: 'fab-textfield',
    template: `
    <div class="ms-TextField" [id]="id" (input)='onValueChanged()'>
        <label #_textFieldLabel class="ms-Label" (click)="onLabelClick($event)">{{label}}</label>
    </div>`,
    inputs: ['isDisabled', 'isRequired'],
    outputs: ['isDisabledChanged', 'isRequiredChanged'],
    encapsulation: ViewEncapsulation.None,

})
export class TextFieldComponent extends IsRequiredAndIsDisabled {

    private _container: HTMLElement;
    private _value: string;

    private _textField: HTMLInputElement | HTMLTextAreaElement;

    @ViewChild("_textFieldLabel", { read: ElementRef })
    private _textFieldLabelRef: ElementRef;

    /** Gets or Sets the label used as the text field description (or placeholder label) */
    @Input() label: string;
    /** Gets or Sets the id of the control */
    @Input() id: string;
    /** Gets ors Sets if the text field will have a placeholder in it, replacing the label */
    @Input() hasPlaceholder: boolean;
    /** Gets or Sets if the text field become an underline text field */
    @Input() isUnderlined: boolean;
    /** Gets or Sets if the text field becomes a multi line text field */
    @Input() isMultiLine: boolean;



    /** Gets or Sets the input value of the text field */
    @Input()
    get value() {
        return this._value;
    }

    set value(text: string) {
        this._value = text;
        this.valueChanged.emit(this.value);
    }
    @Output()
    valueChanged: EventEmitter<string> = new EventEmitter<string>();

    // When the user changes the text field's contents, pull the new value up from the 
    // Fabric component to the Angular 2 component, and tell the parent view about
    // the event.
    onValueChanged(): void {
        this.value = this._textField.value;
    }

    constructor(private element: ElementRef) {
        super();

    }

    ngOnInit() {
        // disable the inner input, to be sure if css is disabled, input is still disabled
        this.isDisabledChanged.subscribe(isDisabled => {
            this._textField.disabled = isDisabled;
        });
    }


    // After the textfield has fully rendered, create a Fabric TextField object for it.
    ngAfterViewInit() {
        // get the div
        this._container = this.element.nativeElement.children[0];

        // create the correct textfield input (input or textarea)
        this._textField = document.createElement((this.isMultiLine ? 'textarea' : 'input'));
        this._textField.classList.add('ms-TextField-field');
        this._textField.addEventListener("focus", this._onFocus.bind(this), false);
        this._textField.addEventListener("blur", this._onBlur.bind(this), false);

        if (this.isMultiLine)
            this._container.classList.add("ms-TextField--multiline")

        // add this new element to my container
        this._container.appendChild(this._textField);

        if (this._container) {
            this._initIsDisable(this._container.classList);
            this._initIsRequired(this._container.classList);
        }

        if (this.hasPlaceholder && !this._container.classList.contains("ms-TextField--placeholder"))
            this._container.classList.add("ms-TextField--placeholder")

        if (this.isUnderlined && !this._container.classList.contains("ms-TextField--underlined"))
            this._container.classList.add("ms-TextField--underlined")

    }


    /** Occurs when click on the label, so ensure that the text box gets focus */
    onLabelClick(ev: any) {
        this._textField.focus();
    }

    _onFocus() {
        if (this.hasPlaceholder && this._textFieldLabelRef.nativeElement.style.display != "none") {
            this._textFieldLabelRef.nativeElement.style.display = "none";
        }

        if (this.isUnderlined && !this._container.classList.contains("is-active")) {
            this._container.classList.add("is-active");
        }
    }

    _onBlur() {
        if (this.hasPlaceholder && this._textField.value.length === 0) {
            this._textFieldLabelRef.nativeElement.style.display = "block";
        }

        if (this.isUnderlined && this._container.classList.contains("is-active")) {
            this._container.classList.remove("is-active");
        }


    }

}