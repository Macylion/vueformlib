import IValidator from './IValidator';
export default class MinValidator implements IValidator{
	errorMessage: string;
	min: number;

	constructor(min: number, errorMessage?: string) {
		this.errorMessage = errorMessage || "Error";
		this.min = min;
	}

	validate(value: string): boolean {
		if(value.length < 1 || value.length >= this.min)
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}