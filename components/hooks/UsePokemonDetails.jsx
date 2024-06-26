import { useState, useEffect } from 'react';

const UsePokemonDetails = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetailsUrl, setPokemonDetailsUrl] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
        );
        const res = await data.json();
        setPokemonList(res.results);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const imageUrl = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const data = await fetch(pokemon.url);
            const res = await data.json();
            return res;
          })
        );

        setPokemonDetailsUrl(imageUrl);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    fetchDetails();
  }, [pokemonList]);

  return {pokemonList,pokemonDetailsUrl };
};

export default UsePokemonDetails;