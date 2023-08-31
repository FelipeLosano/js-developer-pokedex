const pokemonList = document.getElementById('pokemonList');
const pokeFilter = document.querySelector('#filter');
const modal = document.querySelector('#details-section');
const pokedex = document.querySelector('.content');

const maxRecords = 151;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
	return `
        <li class="pokemon ${pokemon.type}-color ${pokemon.types
		.map((type) => type)
		.join(' ')}" onclick='openModal(${pokemon.number})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
											.map(
												(type) => `<li class="type ${type}-color">${type}</li>`
											)
											.join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonToModal(pokemon) {
	return ` 
	<div class="details-container ${pokemon.type}-color">
  <div class="details-header">
    <h2 class="pokemon-name">${pokemon.name} #${pokemon.number}</h2>
    <div class="close-btn-div">
      <span class="close-btn" onclick="closeModal()">X</span>
    </div>
    <div class="detail">
      <ol class="types">
        ${pokemon.types
					.map((type) => `<li class="type ${type}-color">${type}</li>`)
					.join('')}
      </ol>
    </div>
  </div>

  <div class="details-body">
    <div class="details-img-container">
      <div class="details-img">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </div>


    <div class="details-card">
      <div class="details-menu">
        <ul>
          <li>Sobre</li>
          <li>Status Base</li>
          <li>Cadeia de evoluções</li>
          <li>Golpes</li>
        </ul>
      </div>

      <div class="details-content">
        <section class="about">
          <div>Experiência base ${pokemon.baseExp}</div>
          <div>Altura ${pokemon.height} decimetres</div>
          <div>Peso ${pokemon.weight} hectograms</div>
          <div>Habilidades ${pokemon.abilities}</div>
        </section>
      </div>
    </div>
  </div>
</div>`;
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

function openModal(pokemonId) {
	pokeApi.getPokemonDetailById(pokemonId).then((pokemon) => {
		const newHtml = convertPokemonToModal(pokemon);
		modal.innerHTML += newHtml;
	});
	pokedex.style.display = 'none';
	modal.style.display = 'flex';
}

function closeModal() {
	pokedex.style.display = 'flex';
	modal.style.display = 'none';
	modal.innerHTML = '';
}

loadPokemonItens(offset, limit);

pokeFilter.addEventListener('change', filterPokemons);
