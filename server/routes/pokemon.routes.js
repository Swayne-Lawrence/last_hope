const PokemonCon= require("../controllers/pokemon.controller");

module.exports=(app)=>{
    app.post("/api/pokemon", PokemonCon.createPokemon);
    app.put("/api/pokemon/:name", PokemonCon.updatePokemon);
    app.delete("/api/pokemon/:name",PokemonCon.deletePokemon);
    app.get("/api/pokemons", PokemonCon.findAllPokemons);
    app.get("/api/pokemon/:name", PokemonCon.findPokemonByName)
}