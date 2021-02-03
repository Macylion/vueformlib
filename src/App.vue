<template>
	<div>
		<form action="#" v-formGroup="formGroup">
			<input type="text" v-inputControl="formGroup.get('name1')">
			{{ formGroup.get('name1').getError() }}
			<input type="text" v-inputControl="formGroup.get('name2')">
			<input type="text" v-inputControl="formGroup.get('name3')">
			<input type="text" v-inputControl="formGroup.get('name4')">
		</form>
		<button @click="test()">test</button>
		<button @click="test2()">test</button>
		<button @click="testValidate()">Validate</button>
		<button @click="testDirty()">Dirty</button>
		<button @click="testTouched()">Touched</button>
		<button @click="testPristine()">Pristine</button>
		<button @click="testFormValid()">FormValid</button>
	</div>
</template>

<script>
import InputControl from './vueformlib/InputControl'
import FormGroup from './vueformlib/FormGroup'
import EmailValidator from './vueformlib/validators/EmailValidator';
import MaxValidator from './vueformlib/validators/MaxValidator';
import MinValidator from './vueformlib/validators/MinValidator';
import NumberValidator from './vueformlib/validators/NumberValidator';
import RequiredValidator from './vueformlib/validators/RequiredValidator';


class Is5Validator{
	errorMessage;

	constructor(errorMessage) {
		this.errorMessage = errorMessage || "Error";
	}

	validate(value){
		if(value == 5)
			return true;
		else
			return false;
	}

	getError() {
		return this.errorMessage;
	}
}


export default {
	data() {
		return {
			formGroup: new FormGroup({
				name1: new InputControl('', [
					new EmailValidator('Email jest zly'),
				]),
				name2: new InputControl('', [
					new MaxValidator(8),
					new MinValidator(4),
					new RequiredValidator(),
				]),
				name3: new InputControl('', [
					new NumberValidator(),
				]),
				name4: new InputControl('', [
					new Is5Validator()
				])
			}),
		}
	},
	mounted() {
		this.formGroup.on('valueChange', function(e) {
			console.log(e.detail)
		})
	},
	methods: {
		test() {
			console.log('test')
		},
		test2() {
			this.formGroup.get('name1').setValue('232323')
		},
		testValidate() {
			console.log('Validation')
			console.log(1, this.formGroup.get('name1').isValid())
			console.log(2, this.formGroup.get('name2').isValid())
			console.log(3, this.formGroup.get('name3').isValid())
			console.log(4, this.formGroup.get('name4').isValid())
		},
		testDirty() {
			console.log('Dirty')
			console.log(1, this.formGroup.get('name1').isDirty())
			console.log(2, this.formGroup.get('name2').isDirty())
			console.log(3, this.formGroup.get('name3').isDirty())
			console.log(4, this.formGroup.get('name4').isDirty())
		},
		testTouched() {
			console.log('Touched')
			console.log(1, this.formGroup.get('name1').isTouched())
			console.log(2, this.formGroup.get('name2').isTouched())
			console.log(3, this.formGroup.get('name3').isTouched())
			console.log(4, this.formGroup.get('name4').isTouched())
		},
		testPristine() {
			console.log('Pristine')
			console.log(1, this.formGroup.get('name1').isPristine())
			console.log(2, this.formGroup.get('name2').isPristine())
			console.log(3, this.formGroup.get('name3').isPristine())
			console.log(4, this.formGroup.get('name4').isPristine())
		},
		testFormValid() {
			console.log('is form valid', this.formGroup.validate());
		}
		
	}
}
</script>

<style>

</style>