import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Search from './Search';

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    const searchInput = useRef(null)

    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(data => setCharacters(data.results));
    }, []);

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    /*     const handleSearch = event => {
            setSearch(searchInput.current.value);
        } */

    const handleSearch = useCallback(event => {
        setSearch(searchInput.current.value);
    }, [])

    /*   const filterUsers = characters.filter(character => {
          return character.name.toLowerCase().includes(search.toLowerCase());
      }) */

    const filterUsers = useMemo(() =>
        characters.filter(character => {
            return character.name.toLowerCase().includes(search.toLowerCase());
        }), [characters, search]
    )

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            {filterUsers.map(character => (
                <div className="item" key={character.id}>
                    <h2>{character.name}</h2>
                    <button type="button" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
                </div>
            ))}
        </div>
    );
}

export default Characters;