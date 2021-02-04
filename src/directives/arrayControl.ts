import { DirectiveOptions } from 'vue';

const directive: DirectiveOptions = {
	bind(el, binding) {
		binding.value.setElement(el);
		
	}
};

export default directive;