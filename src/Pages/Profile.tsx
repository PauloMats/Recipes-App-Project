import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      if (email) setUserEmail(email);
    }
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <main>
      <section className="profile-wrapper">
        {userEmail && <p data-testid="profile-email">{userEmail}</p>}
        <button
          data-testid="profile-done-btn"
          onClick={ () => handleNavigation('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => handleNavigation('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </section>
    </main>
  );
}

export default Profile;
