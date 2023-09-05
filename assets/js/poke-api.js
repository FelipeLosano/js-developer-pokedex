const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
	const pokemon = new Pokemon();
	pokemon.number = pokeDetail.id;
	pokemon.name = pokeDetail.name;
	pokemon.height = pokeDetail.height;
	pokemon.weight = pokeDetail.weight;
	pokemon.baseExp = pokeDetail.base_experience;
	pokemon.hp = pokeDetail.stats[0].base_stat
	pokemon.atk = pokeDetail.stats[1].base_stat
	pokemon.def = pokeDetail.stats[2].base_stat
	pokemon.spatk = pokeDetail.stats[3].base_stat
	pokemon.spdef = pokeDetail.stats[4].base_stat
	pokemon.spd = pokeDetail.stats[5].base_stat

	const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	const abilities = pokeDetail.abilities.map((abilitySlot) => {
		const str = ` ${abilitySlot.ability.name}`;
		const str2 = ' ' + str.charAt(1).toUpperCase() + str.slice(2);
		return str2;
	});
	const [ability] = abilities;

	const moves = pokeDetail.moves.map((moveSlot) => {
		const str = ` ${moveSlot.move.name}`;
		const str2 = ' ' + str.charAt(1).toUpperCase() + str.slice(2);
		return str2;
	});
	const [move] = moves;

	pokemon.types = types;
	pokemon.type = type;

	pokemon.abilities = abilities;
	pokemon.ability = ability;

	pokemon.moves = moves;
	pokemon.move = move;

	pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

	return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
		.then((detailRequests) => Promise.all(detailRequests))
		.then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonDetailById = (pokemonId) => {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon);
};
