import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function DoneSearchLayout() {
  return (

    <>
      <Header title="Done Recipes" profileTrue searchTrue={ false } />
      <main>
        <Outlet />
      </main>
    </>
  );
}
