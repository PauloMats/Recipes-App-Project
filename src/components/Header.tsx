import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

type HeaderProps = {
  title: string;
  profileTrue: boolean;
  searchTrue: boolean;
};

function Header({
  title,
  searchTrue = false,
  profileTrue = false,
}: HeaderProps) {
  const navigate = useNavigate();

  function handleClick() {
    return navigate('/profile');
  }

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      {searchTrue && (
        <button onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img src={ search } alt="search" data-testid="search-top-btn" />
        </button>
      )}
      {profileTrue && (
        <a href="/profile">
          {' '}
          <img src={ profile } alt="profile" data-testid="profile-top-btn" />
          <button onClick={ handleClick }>Ir para perfil</button>
        </a>
      )}
      {showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
