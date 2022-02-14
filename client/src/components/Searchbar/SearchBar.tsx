import React from 'react';
import { DebounceInput } from 'react-debounce-input';
/* ----- STYLE ----- */
import './SearchBar.css';
/* ----- TYPES ----- */
import { Paste } from '../../@types/types';
interface Props {
  pastes: Paste[];
  setFilteredPastes: React.Dispatch<React.SetStateAction<Paste[]>>;
}

function SearchBar({ pastes, setFilteredPastes }: Props) {
  /* ----- FUNCTIONS ----- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPastes = pastes.filter(
      (paste: Paste) =>
        paste.Title.toLowerCase().includes(searchTerm) ||
        paste.Content.toLowerCase().includes(searchTerm)
    );
    setFilteredPastes(filteredPastes);
  };

  return (
    <DebounceInput
      className='searchbar'
      minLength={0}
      debounceTimeout={500}
      placeholder='Search words by title or content.. 🔎'
      onChange={event => handleInputChange(event)}
    />
  );
}

export default SearchBar;
