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

function createPokemonCard(pokemonData) {
    document.getElementById('pokemon-card').innerHTML = "" // Reset the current content of the div 
    const pokemonCard = createElementWithClasses("div", ["card"])

    let pokemonIdNumber = pokemonData.id.toString().padStart(3, '0') // Make the id of the pokemon use trhee numbers
    const pokemonId = createDivWithText("#" + pokemonIdNumber,  ["pokemon-id"]) // Create a div with the pokemon id

    const pokemonImageDiv = createElementWithClasses("div", ["pokemon-image"]) // Create a div for the pokemon image
    let pokemonImage = document.createElement("img") 
    pokemonImage.setAttribute("src", pokemonData.sprites.other["official-artwork"].front_default) // Get the link for the image 
    pokemonImageDiv.appendChild(pokemonImage) 

    const pokemonName = document.createElement("h1")
    pokemonName.classList.add('pokemon-name')
    pokemonName.innerText = pokemonData.name

    // Add the color circle in the div
    let firstPokemonType = pokemonData.types[0].type.name // Still sucks the api 
    pokemonCard.style.background = `radial-gradient(circle at 50% 0, ${typeColors[firstPokemonType]} 35%, white 40%)`

    pokemonCard.appendChild(pokemonId)
    pokemonCard.appendChild(pokemonImageDiv)
    pokemonCard.appendChild(pokemonName)
    pokemonCard.appendChild(createPokemonTypesDiv([pokemonData.types]))
    pokemonCard.appendChild(createStatusMenu(pokemonData.stats, firstPokemonType))

    console.log(pokemonData)
  
    currentPokemonId = pokemonData.id

    return pokemonCard
}

function createPokemonTypesDiv(types) {
    const typesDiv = document.createElement("div")
    typesDiv.classList.add("types")

    types[0].forEach( (type) => { // Need to index 0 cause the api sucks >:[ 
        let typeP = document.createElement("p")
        typeP.classList.add("type")
        typeP.style.backgroundColor = typeColors[type.type.name]
        typeP.innerText = type.type.name 
        typesDiv.appendChild(typeP)
    })
    return typesDiv
}

function createElementWithClasses(elementName, classes) {
    const element = document.createElement(elementName)
    classes.forEach((_class) => element.classList.add(_class))
    return element
}
function createDivWithText(text, classes) {
    const div = document.createElement("div")
    const textP = document.createElement("p")
    textP.innerText = text 
    div.appendChild(textP)
    classes.forEach( (_class) => div.classList.add(_class))
    return div
}
function createStatusMenu(stats, pokemonType) {
    const statusDiv = document.createElement("div")

    let statusTitle = document.createElement("h1")
    statusTitle.innerText = "status"

    statusDiv.appendChild(statusTitle)
    statusDiv.classList.add("other-info")
    statusDiv.style.backgroundColor = typeColors[pokemonType]
    
    stats.forEach( (stat) => {
        let statusNameDiv = createDivWithText(stat.stat.name.toUpperCase() + ":", ["stat"])
        let statusValue = document.createElement("p")
        statusValue.innerText = stat.base_stat
        statusNameDiv.append(statusValue)

        statusDiv.appendChild(statusNameDiv)
    })

    return statusDiv
}
