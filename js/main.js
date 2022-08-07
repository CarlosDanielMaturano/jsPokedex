const fetchLink = "https://pokeapi.co/api/v2/pokemon"

const typeColors = {
    "normal":   "#A8A77A",
    "fire":     "#EE8130",
    "water":    "#6390F0",
    "electric":  "#F7D02C",
    "grass":    "#7AC74C",
    "ice":      "#96D9D6",
    "fighting": "#C22E28",
    "poison":   "#A33EA1",
    "ground":   "#E2BF65",
    "flying":   "#A98FF3",
    "psychic":  "#F95587",
    "bug":      "#A6B91A",
    "rock":     "#B6A136",
    "ghost":    "#735797",
    "dragon":   "#6F35FC",
    "dark":     "#705746",
    "steel":    "#B7B7CE",
    "fairy":    "#D685AD"
}

function getPokemonInformation(pokemon){
    fetch(fetchLink + '/' + pokemon)
        .then((response) => {
            if(!response.ok){
                alert("Invalid pokemon name or id");
                return;
            }
            return response.json();
        }).then((data) => {
            addPokemonCard(data);
        })
}

function addPokemonCard(pokemonData){
    const pokemonName =     pokemonData.species.name;   
    const pokemonId =       pokemonData.id;
    const pokemonImage =    pokemonData.sprites.other["official-artwork"].front_default;
    const pokemonTypes =    pokemonData.types;
    const pokemonStats =    pokemonData.stats;

    const pokemonCard = /* html */ `
        <div class="card" style="background: radial-gradient(circle at 50% 0, ${typeColors[pokemonTypes[0].type.name]} 35%, white 40%);">
            <div class="main-card">           
            <div class="pokemon-id">
                <p ># ${
                    pokemonId.toLocaleString("en-US", {
                            minimumIntegerDigits: 3,
                            useGrouping: false,
                    })}</p>
            </div>
            <div class="pokemon-image">
                <img src="${pokemonImage}"></img>
            </div>
            <h1 class="pokemon-name">${pokemonName}</h1> 
            <div class="types">      
                ${Array.from((function* getTypes(){
                        for(type of pokemonTypes){
                            yield /* html */`
                                <p class="type" style="background-color: ${typeColors[type.type.name]};"}">${type.type.name}</p>
                                `;
                        };
                    })()).toLocaleString().replace(",", "")
                }
            </div>
            </div>
            <div class="other-info" style="background-color:  ${typeColors[pokemonTypes[0].type.name]}">
                <h1>Stats</h1>
                ${Array.from((function* getStats(){
                    for(stat of pokemonStats){
                        yield /* html */`
                            <div class="stat">
                                <p>${stat.stat.name.toUpperCase()}:</p>
                                <p>${stat.base_stat}</p>  
                            </div>
                        `
                    }
                })()).toLocaleString().replaceAll(',', '')}

            </div>
        </div>
    `;

    document.getElementById("main-content").innerHTML += pokemonCard;
}

function addPokemonsLimit(max){
     fetch(`${fetchLink}?limit=${max}&offset=0`)
        .then(response => response.json())
        .then(pokemons => {
            pokemons.results.forEach(pokemon => {
                getPokemonInformation(pokemon.name);
            });
        })
}
function searchPokemon(){
    let pokemonName = document.getElementById("pokemon-name").value; 
    try{
        getPokemonInformation(pokemonName.toLowerCase());
        document.getElementById("main-content").innerHTML = "";
    }
    catch (error) {
        alert("Invalid pokemon name or id");
    }
}

addPokemonsLimit(32);