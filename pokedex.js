const Pokemonlist = document.querySelector("#Pokemonlist");
const buttonsHeader = document.querySelectorAll(".btn-header")
let url = "https://pokeapi.co/api/v2/pokemon/";
for (let i = 1; i <= 890; i++){
    fetch(url+i)
        .then((response) => response.json())
        .then(data => pokemonster(data))
}

function pokemonster(poke){
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tight">${type.type.name}</p>`);
    tipos = tipos.join('');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="Pokemon">    
        <p class = "pokemon-id-back">#${poke.id}</p>
        <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}"> 
        </div>
        <div class="pokemon-info">
            <div class="number-containers">
                <h2 class="pokemon-number">${poke.name}</h2>
            </div>
            <div class="pokemon-types">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height} M</p>
                <p class="ability">${poke.abilities["0"].ability.name}</p>
                <p class="stat">${poke.weight} KG</p>
            </div>
        </div>
    </div>       
    `;
    Pokemonlist.append(div); 
}

buttonsHeader.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    Pokemonlist.innerHTML = "";

    for (let i = 1; i<= 890; i++){
        fetch(url+i)
            .then((response) => response.json())
            .then(data => {
                /*let tights = (data.types.map(type => type.type.name));
                if (tights.some(tight => tight.includes(buttonId))){
                    pokemonster(data);
                }*/
                if (buttonId === "AllPokemon"){
                    pokemonster(data);
                }
                else {
                    const tights = data.types.map(type => type.type.name);
                    if(tights.some(tight => tight.includes(buttonId))) {
                        pokemonster(data);
                    }
                }
            })
    }
}))