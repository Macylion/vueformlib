import InputControl from "./InputControl";

export default class ArrayControl extends InputControl{

	private inputControls: Array<InputControl>;

	constructor() {
		super("", []);
		this.inputControls = [];
	}

	validate(): boolean {
		for (let i = 0; i < this.inputControls.length; i++) {
			const element = this.inputControls[i];
			if(!element.validate())
				return false;
		}
		return true;
	}

	add(inputControl: InputControl) {
		const inp = inputControl.setEventTarget(this.eventTarget);
		this.inputControls.push(inp);
	}

	getAll() {
		return this.inputControls;
	}

	get(key: number): InputControl | null{
		for (let i = 0; i < this.inputControls.length; i++) {
			const element = this.inputControls[i];
			if(i === key)
				return element;
		}
		return null;
	}

	remove(key: number) {
		this.inputControls[key].setEventTarget(null);
		this.inputControls[key].setElement(null);
		this.inputControls.splice(key, 1);
	}

	getValue(): string | Array<{key: number; value: string}> {
		const values: Array<{key: number; value: string}> = [];
		for (let i = 0; i < this.inputControls.length; i++) {
			const element = this.inputControls[i];
			values.push({
				key: i,
				value: element.getValue() as string,
			});
		}
		return values;
	}

}