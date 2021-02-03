import IValidator from './IValidator';
export default class MaxValidator implements IValidator{
	errorMessage: string;
	max: number;

	constructor(max: number, errorMessage?: string) {
		this.errorMessage = errorMessage || "Error";
		this.max = max;
	}

	validate(value: string): boolean {
		if(value.length < 1 || value.length <= this.max)
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}