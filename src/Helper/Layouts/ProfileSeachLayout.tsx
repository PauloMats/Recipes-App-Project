import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export function ProfileSearchLayout() {
  return (
    <>
      <Header title="Profile" profileTrue searchTrue={ false } />
      <Footer />
      <main>
        <Outlet />
      </main>
    </>
  );
}
