import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
	bind(el, binding) {
		binding.value.setElement(el);
		for (const key in binding.value.inputControls) 
			if (Object.prototype.hasOwnProperty.call(binding.value.inputControls, key)) 
				binding.value.inputControls[key].setEventTarget(binding.value);

	}
};

export default directive;