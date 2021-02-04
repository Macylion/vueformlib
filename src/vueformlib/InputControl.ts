import FormGroup from './FormGroup';
import IValidator from './validators/IValidator';
export default class InputControl {

	protected defaultValue: string;
	protected value: string;
	protected validators: Array<IValidator>;

	protected touched: boolean;
	protected errorMessage: string;

	protected element: HTMLInputElement | null;
	protected eventTarget: FormGroup | null;

	constructor(value: string, validators: Array<IValidator>){
		this.defaultValue = value;
		this.value = value;
		this.validators = validators;
		this.touched = false;
		this.errorMessage = "";
		this.element = null;
		this.eventTarget = null;
	}

	reset() {
		this.value = this.defaultValue;
		this.touched = false;
		this.validate();
		this.errorMessage = "";
	}

	getEventTarget(): FormGroup | null {
		return this.eventTarget;
	}

	setEventTarget(eventTarget: FormGroup | null): InputControl{
		this.eventTarget = eventTarget;
		this.element?.addEventListener('keyup', () => {
			this.eventTarget?.emitValueChange(this.value);
		})
		return this;
	}

	getElement(): HTMLInputElement | null {
		return this.element;
	}

	setElement(el: HTMLInputElement) {
		this.element = el;
	}

	on(eventName: string, callback: EventListenerOrEventListenerObject) {
		this.element?.addEventListener(eventName, callback);
	}

	validate(): boolean {
		this.errorMessage = "";
		for (let i = 0; i < this.validators.length; i++){
			const validator = this.validators[i];
			if(!validator.validate(this.value)){
				this.errorMessage = validator.errorMessage;
				return false;
			}
		}

		return true;
	}

	getValue(): string  | Array<{key: number; value: string}> | { [key: string]: string  | Array<{key: number; value: string}>}{
		// this.emitValueChange(this.value);
		return this.value;
	}

	getError(): string {
		return this.errorMessage;
	}

	isDirty(): boolean {
		return this.value.length > 0;//|| this.isTouched()
	}

	isPristine(): boolean {
		return this.value.length === 0;
	}

	isTouched(): boolean {
		return this.touched;
	}

	blur() {
		this.touched = true;
		this.validate();
	}

	setValue(value: string) {
		this.value = value;
		this.emitValueChange(this.value);
		if(this.errorMessage.length > 0)
			this.validate();
	}

	emitValueChange(value: string) {
		this.element?.dispatchEvent(new CustomEvent('valueChange', {
			detail: this.value,
		}));
	}

}