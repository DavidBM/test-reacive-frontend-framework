class Ash extends CoalComponent {
	render(){
		return `
		<div>
			<div class="hostia-que-funciona" coal-content="name"></div>
			<input type="text" value="hola" coal-input-change-state="name">
			<button coal-click="changeContentToShit"></button>
		</div>
		`;
	}

	changeContentToShit(){
		this.state.name = Math.random().toFixed(5);
	}
}
