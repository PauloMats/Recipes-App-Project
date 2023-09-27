import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function FullHeaderLayout() {
  return (
    <>
      <Header title="" profileTrue searchTrue />
      <main>
        <Outlet />
      </main>
    </>
  );
}
