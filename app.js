class Coal {
	constructor(element) {
		this._propertiesOperators = new Map();
		this.state = this._proxify({});
		this.dom = this._renderComponent();

		this.element = element;
	}

	getState(){
		return this.state;
	}

	getDom(){
		return this.dom;
	}

	_proxify(obj) {
		return new Proxy(obj, {
			set: (target, property, value) => this._onStateChange(target, property, value)
		});
	}

	_onStateChange(target, property, value) {
		var operators = this._propertiesOperators.get(property);

		if(!operators || operators.length <= 0)
			return;

		operators.forEach((elements, operator) => {
			this._applyStateChange(operator, elements, value);
		});
	}

	_applyStateChange(operator, elements, value){
		if(operator === 'coal-content'){
			elements.forEach(element => element.innerHTML = value);
		}
	}

	_renderComponent() {
		var template = document.createElement('template');
		template.innerHTML = this.render();
		var dom = template.content;

		this._indexContentOperator(dom, 'coal-content');
		this._indexClickOperator(dom, 'coal-click');

		return dom;
	}

	_indexContentOperator(dom, operator){
		var contentOperators = dom.querySelectorAll('[' + operator + ']');
		var stateAttribute = Array.from(contentOperators).map(element => element.getAttribute(operator));

		stateAttribute.forEach(name => {

			if(!this._propertiesOperators.get(name))
				this._propertiesOperators.set(name, new Map());

			if(!this._propertiesOperators.get(name).get(operator))
				this._propertiesOperators.get(name).set(operator, new Set());

			var propertyOperators = this._propertiesOperators.get(name).get(operator);

			Array.from(contentOperators).forEach(element => propertyOperators.add(element));
			
		});
	}

	_indexClickOperator(dom, operator){
		var contentOperators = dom.querySelectorAll('[' + operator + ']');
		var callbackName = Array.from(contentOperators).map(element => element.getAttribute(operator));

		callbackName.forEach((name, index) => {

			var element = contentOperators[index];

			element.addEventListener('click', e => this[name](e));
		});
	}
}

class CoalFramework {
	constructor() {
		this.tags = new Map();
		this.components = new Map();
	}

	registerComponent(component){
		this.tags.set(component.name, component);
	}

	start(){
		this.tags.forEach((component, name) => {
			var elements = document.querySelectorAll(name);

			if(elements.length <= 0){
				return;
			}

			elements.forEach(element => {

				var instance = new component(element);

				if(!this.components.get(name)){
					this.components.set(name, new Set());
				}

				this.components.get(name).add(instance);

				var dom = instance.getDom();

				element.appendChild(dom);
			});
		});
	}
}

class Ash extends Coal {
	render(){
		return `
		<div>
			<div class="hostia-que-funciona" coal-content="name"></div>
			<button coal-click="changeContentToShit"></button>
		</div>
		`;
	}

	changeContentToShit(){
		this.state.name = Math.random().toFixed(5);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	var coal = new CoalFramework();

	coal.registerComponent(Ash);

	coal.start();
});
