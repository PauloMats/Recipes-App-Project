import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function FavoriteSearchLayout() {
  return (
    <>
      <Header title="Favorite Recipes" profileTrue searchTrue={ false } />
      <main>
        <Outlet />
      </main>
    </>

  );
}
