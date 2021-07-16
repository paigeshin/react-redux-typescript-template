import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "./Store";
import { GetPokemon } from "./actions/PokemonActions";

function App() {
  // Redux
  const dispatch = useDispatch(); //Redux-action
  const pokemonState = useSelector((state: RootStore) => state.pokemon); //Redux-state

  // Component State
  const [pokemonName, setPokemonName] = useState("");

  // functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };
  const handleSubmit = () => {
    console.log(`Search for ${pokemonName}`);
    dispatch(GetPokemon(pokemonName));
  };

  console.log(`Pokemon state: ${pokemonState}`);

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
      {pokemonState.pokemon && (
        <div>
          <img
            src={pokemonState.pokemon?.sprites.front_default}
            alt="pokemon"
          />
          {pokemonState.pokemon.abilities.map((ability, index) => {
            return <p key={index}>{ability.ability.name}</p>;
          })}
        </div>
      )}
      {/* <div>{pokemonState}</div> */}
    </div>
  );
}

export default App;
