# Create Project

`npx create-react-app ${my-project} --template typescript`

# Dependency

```bash
npm i axios redux react-redux @types/redux @types/react-redux redux-devtools-extension redux-thunk @types/redux-thunk
```

- axios
- redux
- react-redux
- @types/redux
- @types/react-redux
- redux-devtools-extension
- redux-thunk
- @types/redux-thunk

# Store Setting

- ./Store.js

```tsx
import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;
export default Store;
```

# Index.tsx

- ./index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

# Types

- ./actions/PokemonActions.ts

```tsx
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
```

- ./actions/PokemonActionTypes.ts

```tsx
export const POKEMON_LOADING = "POKEMON_LOADING";
export const POKEMON_FAIL = "POKEMON_LOADING";
export const POKEMON_SUCCESS = "POKEMON_LOADING";

//Type is for data
//Interface is for action

export type PokemonType = {
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
};

/** JSON Mapping for payload **/
export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  front_default: string;
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

/** Bind type with interface **/
export interface PokemonLoading {
  type: typeof POKEMON_LOADING; //Literal Type
}

export interface PokemonSuccess {
  type: typeof POKEMON_SUCCESS;
  payload: PokemonType;
}

export interface PokemonFail {
  type: typeof POKEMON_FAIL;
}

export type PokemonDispatchTypes =
  | PokemonLoading
  | PokemonFail
  | PokemonSuccess;
```

- ./actions/PokemonActions.ts

```tsx
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
```

# Reducers

- ./reducers/RootReducer

```tsx
import { combineReducers } from "redux";
import pokemonReducer from "./PokemonReducer";

const RootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default RootReducer;
```

- ./reducers/PokemonReducers.ts

```tsx
import {
  PokemonDispatchTypes,
  PokemonSuccess,
  PokemonType,
  POKEMON_FAIL,
  POKEMON_LOADING,
  POKEMON_SUCCESS,
} from "../actions/PokemonActionTypes";

interface DefaultStateI {
  loading: boolean;
  pokemon?: PokemonType;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const pokemonReducer = (
  state: DefaultStateI = defaultState,
  action: PokemonDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case POKEMON_SUCCESS: {
      return {
        loading: false,
        pokemon: (action as PokemonSuccess).payload,
      };
    }
    case POKEMON_FAIL: {
      return {
        loading: false,
      };
    }
    case POKEMON_LOADING: {
      return {
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default pokemonReducer;
```

# App.js

- with `useDispatch` and `useSelctor`

```tsx
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
```
