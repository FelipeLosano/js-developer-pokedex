const pokemonList = document.getElementById('pokemonList');
const pokeFilter = document.querySelector('#filter');

const maxRecords = 151;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
	return `
        <li class="pokemon ${pokemon.type}-color ${pokemon.types
		.map((type) => type)
		.join(' ')}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
				    .map((type) => `<li class="type ${type}-color">${type}</li>`)
				    .join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map(convertPokemonToLi).join('');
		pokemonList.innerHTML += newHtml;
	});
}

function filterPokemons() {
	const type = pokeFilter.value;
	const selectedTypeArr = Array.from(pokemonList.querySelectorAll('.pokemon'));
	selectedTypeArr.forEach((e) => {
		if (e.classList.contains(type)) {
			e.style.display = 'flex';
		} else {
			e.style.display = 'none';
		}
		if (type == 'all') {
			e.style.display = 'flex';
		}
	});
}

loadPokemonItens(offset, limit);

pokeFilter.addEventListener('change', filterPokemons);
