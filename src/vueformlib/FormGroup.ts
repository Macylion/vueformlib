import InputControl from './InputControl';
export default class FormGroup extends InputControl{
	
	private inputControls: { [key: string]: InputControl | FormGroup };

	//private element: HTMLInputElement | null;

	constructor(inputControls: { [key: string]: InputControl | FormGroup }){
		super('', []);
		this.inputControls = inputControls;
		this.element = null;
	}

	getElement(): HTMLInputElement | null{
		return this.element;
	}

	setElement(el: HTMLInputElement) {
		this.element = el;
	}

	validate(): boolean {
		for (const key in this.inputControls) {
			if (Object.prototype.hasOwnProperty.call(this.inputControls, key)) {
				const control = this.inputControls[key];
				if(!control.validate())
					return false;
			}
		}
		return true;
	}

	get(key: string){
		return this.inputControls[key];
	}

	getValue(): any {
		const values: any  = {};
		for (const key in this.inputControls)
			if (Object.prototype.hasOwnProperty.call(this.inputControls, key))
				values[key] = this.inputControls[key].getValue();
		return values;
	}


	emitValueChange(value: string) {
		this.element?.dispatchEvent(new CustomEvent('valueChange', {
			detail: this.getValue(),
		}));
	}

	on(eventName: string, callback: EventListenerOrEventListenerObject){
		this.element?.addEventListener(eventName, callback);
	}
}