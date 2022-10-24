const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokedexImage = document.querySelector('.pokedex')

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');


let pokemonId = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data
  }

}


const renderizaPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'loading...'
  pokemonNumber.innerHTML = ''
  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'

    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokedexImage.className='pokedex'

    inputSearch.value = ''


    pokemonId = data.id

    console.log(data)
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Não existe :('
    pokemonNumber.innerHTML = '?'
    pokedexImage.className = 'pokedex shake-horizontal'
  }


}


form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderizaPokemon(inputSearch.value.toLowerCase())


})

renderizaPokemon('1')

btnPrev.addEventListener('click', () => {

  if (pokemonId > 1) {
    pokemonId -= 1
  }

  renderizaPokemon(pokemonId)


})

btnNext.addEventListener('click', () => {
  pokemonId += 1
  renderizaPokemon(pokemonId)


})


document.addEventListener('keydown', function (event) {
  const key = event.key;

  switch (event.key) {



    case "ArrowLeft":

      if (pokemonId > 1) {
        pokemonId -= 1
      }

      renderizaPokemon(pokemonId)

      break;

    case "ArrowRight":
      pokemonId += 1
      renderizaPokemon(pokemonId)

      break;
  }
});

renderizaPokemon(pokemonId)