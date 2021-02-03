import IValidator from './IValidator';
export default class NumberValidator implements IValidator{
	errorMessage: string;

	constructor(errorMessage?: string) {
		this.errorMessage = errorMessage || "Error";
	}

	validate(value: string): boolean {
		if(value.length < 1 || /^\d+$/.test(value.toLowerCase()))
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}