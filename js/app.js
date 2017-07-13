class Ash extends CoalComponent {
	render(){
		return `
		<div>
			<div class="hostia-que-funciona" coal-content-unsafe="name"></div>
			<input type="text" value="hola" coal-bind="name">
			<button coal-click="changeContentToShit"></button>
		</div>
		`;
	}

	changeContentToShit(){
		this.state.name = Math.random().toFixed(5);
	}
}
