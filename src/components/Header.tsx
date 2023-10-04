import { useState } from 'react';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import NavigateToProfile from '../utils/NavigateToProfile';
import '../css/Header.css';
import logo from '../images/logoRecipes.svg';
import textLogo from '../images/textLogo.svg';
import meals from '../images/iconMeal.svg';
import drink from '../images/iconDrink.svg';
import profileIcon from '../images/profile.svg';

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
  // function handleClick() {
  //   return navigate('/profile');
  // }

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <header>
        <img src={ logo } alt="logo" />
        <img src={ textLogo } alt="textLogo" />
        {searchTrue && (
          <button onClick={ () => setShowSearchBar(!showSearchBar) }>
            <img src={ search } alt="search" data-testid="search-top-btn" />
          </button>
        )}
        {profileTrue && (
          <a href="/profile">
            {' '}
            <img src={ profile } alt="profile" data-testid="profile-top-btn" />
            {/* <NavigateToProfile /> */}
          </a>
        )}
      </header>
      <div data-testid="icon-options">
        {title === 'Meals' && <img src={ meals } alt="meals" />}
        {title === 'Drinks' && <img src={ drink } alt="meals" />}
        {title === 'Profile' && <img src={ profileIcon } alt="meals" />}
      </div>
      <h1 data-testid="page-title">{title}</h1>
      {showSearchBar && <SearchBar />}
    </div>
  );
}

export default Header;
