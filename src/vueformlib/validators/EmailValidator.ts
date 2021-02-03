import IValidator from './IValidator';
export default class EmailValidator implements IValidator{
	errorMessage: string;

	constructor(errorMessage?: string) {
		this.errorMessage = errorMessage || "Error";
	}

	validate(value: string): boolean {
		if(value.length < 1 || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase()))
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}