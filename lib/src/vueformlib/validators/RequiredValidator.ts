import IValidator from './IValidator';
export default class RequiredValidator implements IValidator{
	errorMessage: string;

	constructor(errorMessage?: string) {
		this.errorMessage = errorMessage || "Error";
	}

	validate(value: string): boolean {
		if(value.length > 0)
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}