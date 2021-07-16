import axios from "axios";
import { Dispatch } from "redux";
import {
  PokemonDispatchTypes,
  POKEMON_LOADING,
  POKEMON_SUCCESS,
  POKEMON_FAIL,
} from "./PokemonActionTypes";

export const GetPokemon =
  (pokemon: string) => async (dispatch: Dispatch<PokemonDispatchTypes>) => {
    try {
      dispatch({
        type: POKEMON_LOADING,
      });
      console.log(`Search for ${pokemon}`);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      console.log(`Search result for ${pokemon}: ${res.data}`);
      dispatch({
        type: POKEMON_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(`Search Error for ${pokemon} => ${error}`);
      dispatch({ type: POKEMON_FAIL });
    }
  };
