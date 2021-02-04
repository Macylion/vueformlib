<template>
	<div>
		<button @click="test">test</button>
		<button @click="test2">test</button>
		<button @click="testValidate">Validate</button>
		<button @click="testDirty">Dirty</button>
		<button @click="testTouched">Touched</button>
		<button @click="testPristine">Pristine</button>
		<button @click="testFormValid">FormValid</button>
		<button @click="testReset">Reset</button>
		<button @click="testAdd">Add</button>
		<button @click="testAddForm">AddForm</button>
		<button @click="testGet2ndInputFromArray">Get2ndInputFromArray</button>

		<hr />
		<form action="#" v-formGroup="formGroup">
			<input type="text" v-inputControl="formGroup.get('name1')">
			{{ formGroup.get('name1').getError() }}
			<input type="text" v-inputControl="formGroup.get('name2')">
			{{ formGroup.get('name2').getError() }}
			<input type="text" v-inputControl="formGroup.get('name3')">
			{{ formGroup.get('name3').getError() }}
			<input type="text" v-inputControl="formGroup.get('name4')">
			{{ formGroup.get('name4').getError() }}

			<hr />
			<div v-arrayControl="formGroup.get('array1')">
				<div v-for="(control, index) in formGroup.get('array1').getAll()" :key="index">
					<input type="text" v-inputControl="control"> 
					<span @click="formGroup.get('array1').remove(index)">[remove]</span>
					{{ control.getError() }}
				</div>
			</div>

			<hr />
			<div v-arrayControl="formGroup.get('arrayForm')">
				<div v-for="(group, index) in formGroup.get('arrayForm').getAll()" :key="index">
					<input type="text" v-inputControl="group.get('nameA')">
					{{ group.get('nameA').getError() }}
					<input type="text" v-inputControl="group.get('nameB')">
					{{ group.get('nameB').getError() }}
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import InputControl from './vueformlib/InputControl';
import FormGroup from './vueformlib/FormGroup';
import ArrayControl from './vueformlib/ArrayControl';
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
				name1: new InputControl('mail@mail.ma', [
					new EmailValidator('Email jest zly'),
				]),
				name2: new InputControl('12345a', [
					new MaxValidator(8),
					new MinValidator(4),
					new RequiredValidator(),
				]),
				name3: new InputControl('2', [
					new NumberValidator(''),
				]),
				name4: new InputControl('dsds5', [
					new Is5Validator()
				]),
				array1: new ArrayControl(),
				arrayForm: new ArrayControl(),
			}),
		}
	},
	mounted() {
		this.formGroup.on('valueChange', function(e) {
			console.log(e.detail)
		})

		this.testAdd();
		this.testAddForm();
	},
	methods: {
		testGet2ndInputFromArray() {
			console.log(this.formGroup.get('array1').get(2));
		},
		testAdd() {
			this.formGroup.get('array1').add(new InputControl('test@test.te', [
				new RequiredValidator(),
				new EmailValidator(),
			]))
		},
		testAddForm() {
			this.formGroup.get('arrayForm').add(new FormGroup({
				nameA: new InputControl('1', [
					new RequiredValidator(),
				]),
				nameB: new InputControl('2', [
					new RequiredValidator()
				])
			}))
		},
		test() {
			console.log('test')
		},
		test2() {
			this.formGroup.get('name1').setValue('232323')
			this.formGroup.get('name1').validate()
		},
		testValidate() {
			console.log('Validation')
			console.log(1, this.formGroup.get('name1').validate())
			console.log(2, this.formGroup.get('name2').validate())
			console.log(3, this.formGroup.get('name3').validate())
			console.log(4, this.formGroup.get('name4').validate())
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
		},
		testReset() {
			console.log('Reset')
			console.log(1, this.formGroup.get('name1').reset());
			console.log(2, this.formGroup.get('name2').reset());
			console.log(3, this.formGroup.get('name3').reset());
			console.log(4, this.formGroup.get('name4').reset());
		}
		
	}
}
</script>

<style>

</style>