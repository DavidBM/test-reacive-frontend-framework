class CoalFramework {
	constructor() {
		this.tags = new Map();
		this.components = new Map();
	}

	registerComponent(component){
		this.tags.set(component.name, component);
	}

	start(){
		this.initTags();
	}

	initTags() {
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
