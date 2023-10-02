import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function MealsLayout() {
  return (
    <>
      <Header title="Meals" profileTrue searchTrue />
      <main>
        <Outlet />
      </main>
    </>
  );
}
