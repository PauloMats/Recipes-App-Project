import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function DrinksLayout() {
  return (
    <>
      <Header title="Drinks" profileTrue searchTrue />
      <main>
        <Outlet />
      </main>
    </>
  );
}
