import FormGroup from './FormGroup';
import IValidator from './validators/IValidator';
export default class InputControl {

	private defaultValue: string;
	private value: string;
	private validators: Array<IValidator>;

	private touched: boolean;
	private errorMessage: string;

	private element: HTMLInputElement | null;
	private eventTarget: FormGroup | null;

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
		this.isValid();
		this.errorMessage = "";
	}

	getEventTarget(): FormGroup | null {
		return this.eventTarget;
	}

	setEventTarget(eventTarget: FormGroup | null){
		this.eventTarget = eventTarget;
		this.element?.addEventListener('keyup', () => {
			this.eventTarget?.emitValueChange(this.value);
		})
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

	isValid(): boolean {
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

	getValue(): string {
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
		this.isValid();
	}

	setValue(value: string) {
		this.value = value;
		this.emitValueChange(this.value);
		if(this.errorMessage.length > 0)
			this.isValid();
	}

	emitValueChange(value: string) {
		this.element?.dispatchEvent(new CustomEvent('valueChange', {
			detail: this.value,
		}));
	}

}