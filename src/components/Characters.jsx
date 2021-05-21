import React, {
  useState,
  // useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
// Import custom hooks
import useCharacters from "../hooks/useCharacters";
import Search from "./Search";
const API = "https://rickandmortyapi.com/api/character/";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  // const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const characters = useCharacters(API);

  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return setCharacters(data.results);
  //     });
  // }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredUsers = useMemo(() =>
    characters.filter(
      (user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      },
      [search, characters]
    )
  );

  return (
    <div>
      <div className="Characters-favorites">
        <h3>FAVORITES</h3>
        {favorites.favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </div>
      <br />
      <h3>CHARACTERS</h3>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      <div className="Characters">
        {filteredUsers.map((character) => (
          <div className="container-item" key={character.id}>
            <div className="container-image">
              {
                <img
                  src={character.image}
                  alt={`image-${character.id}`}
                  className="character-image"
                />
              }
            </div>
            <div className="container-name">
              <h2 className="name-item">{character.name}</h2>
              <button
                type="button"
                onClick={() => {
                  handleClick(character);
                }}
              >
                Agregar a favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
