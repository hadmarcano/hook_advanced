import { useState, useEffect } from "react";

// CUSTOM HOOKS
const useCharacters = (url) => {
  // state initialization
  const [characters, setCharacters] = useState([]);
  // update state when url's changed
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setCharacters(data.results);
      });
  }, [url]);
  // return array with characters
  return characters;
};

export default useCharacters;
