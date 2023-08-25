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

		<div class="details-img-container">
			<div class="details-img">
				<img src="${pokemon.photo}" alt="${pokemon.name}">
			</div>
		</div>

		<div class="details-menu">

				<ul>
						<li>Sobre</li>
						<li>Status Base</li>
						<li>Cadeia de evoluções</li>
						<li>Golpes</li>
				</ul>

				<section class="about">
						<div>Experiência base</div>
						<div>Altura</div>
						<div>Peso</div>
						<div>Habilidades</div>
						<div>Egg Groups</div>
						<div>Geração</div>

						<h3>Descrição</h3>
						<p></p>
				</section>

				<section class="base-stats">
						<div>Vida</div>
						<div>Ataque</div>
						<div>Defesa</div>
						<div>Sp. Atk.</div>
						<div>Sp. Def.</div>
						<div>Speed</div>
				</section>

				<section class="evolutions">
						<div>Atual</div>
						<div>Pré-evolução</div>
						<div>Evolução</div>
				</section>

				<section class="moves">
						<ul>
								<li>golpes 1</li>
								<li>golpes 2</li>
								<li>golpes 3</li>
						</ul>
				</section>

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
	modal.style.display = 'block';
}

function closeModal() {
	pokedex.style.display = 'grid';
	modal.style.display = 'none';
	modal.innerHTML = '';
}

loadPokemonItens(offset, limit);

pokeFilter.addEventListener('change', filterPokemons);
