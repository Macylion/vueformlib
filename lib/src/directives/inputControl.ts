import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
	bind: function (el: HTMLElement, binding) {

		binding.value?.setElement(el);

		el.addEventListener('keyup', () => {
			binding.value.setValue((el as HTMLInputElement).value);
		});

		el.addEventListener('blur', () => {
			binding.value.blur();
		});

		(el as HTMLInputElement).value = binding.value?.value;
	},
	update: function(el, binding) {
		(el as HTMLInputElement).value = binding.value?.value;
	}
};

export default directive;