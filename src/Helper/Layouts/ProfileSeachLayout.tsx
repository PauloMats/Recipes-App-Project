import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export function ProfileSearchLayout() {
  return (
    <>
      <Header title="Profile" profileTrue searchTrue={ false } />
      <main>
        <Outlet />
      </main>
    </>
  );
}
