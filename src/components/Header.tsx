import React, { useState } from 'react';
import SearchBar from './SearchBar'; // Certifique-se de importar o componente SearchBar corretamente

function Header() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prevVisible) => !prevVisible);
  };

  return (
    <header>
      <button data-testid="profile-top-btn">
        Profile
      </button>
      <button data-testid="search-top-btn">
        Profile
      </button>
      <button onClick={toggleSearchBar} data-testid="toggle-search-btn">
        Toggle Search Bar
      </button>
      {isSearchBarVisible && <SearchBar />}
    </header>
  );
}

export default Header;
