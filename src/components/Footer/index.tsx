import { Link } from 'react-router-dom';
import drink from '../../images/drinkIcon.svg';
import meals from '../../images/mealIcon.svg';
import './index.css';

function Footer() {
  return (
    <div data-testid="footer" id="footer">
      <Link to="/drinks">
        <img
          className="footer-icon"
          src={ drink }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          className="footer-icon"
          src={ meals }
          alt="meals icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
