import InputControl from "./InputControl";

export default class ArrayControl extends InputControl{

	private inputControls: Array<InputControl>;

	constructor() {
		super("", []);
		this.inputControls = [];
	}

	add(inputControl: InputControl) {
		const inp = inputControl.setEventTarget(this.eventTarget);
		this.inputControls.push(inp);
	}

	getAll() {
		return this.inputControls;
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