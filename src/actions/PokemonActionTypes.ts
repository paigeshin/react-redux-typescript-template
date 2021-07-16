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
