export default interface IValidator{
	errorMessage: string;
	validate(value: string): boolean;
	getError(): string;
}