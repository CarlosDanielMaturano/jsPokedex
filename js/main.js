const fetchLink = "https://pokeapi.co/api/v2/pokemon/"
var currentPokemonId = 0;

async function fetchPokemonData(pokemon) {
    try {
        const rawPokemonData = await fetch(fetchLink + pokemon) 
        const jsonPokemonData =  await rawPokemonData.json()
        const pokemonCardContent = document.getElementById('pokemon-card')
        pokemonCardContent.appendChild(createPokemonCard(jsonPokemonData))
    } catch (error) {
        console.log(error) 
    }
}

const form = document.getElementById('form') 
form.addEventListener('submit', (event) => {
    event.preventDefault()
    fetchPokemonData(event.target.querySelector('input').value.toLowerCase())
    form.reset()
})

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const maximumPokemonCount = 721 // The api provides consistent information only about pokemons until gen 7

const buttons = document.querySelectorAll(".action-button")
buttons.forEach( button => button.addEventListener('click', function() {
    currentPokemonId = clamp(currentPokemonId + parseInt(this.getAttribute("value")), 1, maximumPokemonCount)
    fetchPokemonData(currentPokemonId)
}))

window.onload = fetchPokemonData('1')
