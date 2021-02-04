import Vue from 'vue'
import App from './App.vue'
import arrayControl from './directives/arrayControl'
import formGroup from './directives/formGroup'
import inputControl from './directives/inputControl'

Vue.config.productionTip = false

Vue.directive('formGroup', formGroup)
Vue.directive('inputControl', inputControl)
Vue.directive('arrayControl', arrayControl)

new Vue({
	render: h => h(App),
}).$mount('#app')