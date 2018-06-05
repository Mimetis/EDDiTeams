import { EventEmitter } from "@angular/core";

export function coerceBoolean(value: any): boolean {

    if (value == '')
        return true;

    if (`${value}`.toLowerCase() == "1")
        return true;
    if (`${value}`.toLowerCase() == "true")
        return true;

    return false;

}


// ----------------------------------------
// MIXINS
// ----------------------------------------

// Create a type that have a constructor, returning an instance of T
type Constructor<T = {}> = new (...args: any[]) => T;

// return a default class 
export function mixin() { return class { } }


/** Mixin to augment a component with a `isDisabled` property. */
export function mixinDisabled<T extends Constructor>(base: T) {

    return class extends base {
        _classList: DOMTokenList;

        _initIsDisable(classList: DOMTokenList) {
            this._classList = classList;
            this._checkIsDisabled();
        }

        private _isDisabled: boolean = false;


        get isDisabled(): boolean {
            return this._isDisabled;
        }
        set isDisabled(value: boolean) {
            this._isDisabled = coerceBoolean(value);

            this._checkIsDisabled();
        }


        isDisabledChanged = new EventEmitter<boolean>();

        _checkIsDisabled(): any {

            if (!this._classList)
                return;

            if (this._isDisabled && !this._classList.contains("is-disabled"))
                this._classList.add("is-disabled");
            else if (!this._isDisabled && this._classList.contains("is-disabled"))
                this._classList.remove("is-disabled");

            this.isDisabledChanged.emit(this._isDisabled);
        }

    };
}


/** Mixin to augment a component with a `isRequired` property. */
export function mixinRequired<T extends Constructor= { new(...args: any[]) }>(baseComponent: T) {
    return class extends baseComponent {
        _classList: DOMTokenList;

        _initIsRequired(classList: DOMTokenList) {
            this._classList = classList;
            this._checkIsRequired();
        }

        private _isRequired: boolean = false;


        get isRequired(): boolean {
            return this._isRequired;
        }
        set isRequired(value: boolean) {
            this._isRequired = coerceBoolean(value);

            this._checkIsRequired();
        }


        isRequiredChanged = new EventEmitter<boolean>();

        _checkIsRequired(): any {

            if (!this._classList)
                return;

            if (this._isRequired && !this._classList.contains("is-required"))
                this._classList.add("is-required");
            else if (!this._isRequired && this._classList.contains("is-required"))
                this._classList.remove("is-required");

            this.isRequiredChanged.emit(this._isRequired);
        }

    }
}

