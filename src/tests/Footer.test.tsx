import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para adicionar recursos de jest-dom
import Footer from '../components/Footer';
import renderWithRouter from '../Helper/renderWihtRouter';

test('renderiza o componente', () => {
  renderWithRouter(<Footer />);

  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});

test('renderiza os ícones de drinks e meals com os links corretos', () => {
  renderWithRouter(<Footer />);

  const drinksLink = screen.getByTestId('drinks-bottom-btn');
  const mealsLink = screen.getByTestId('meals-bottom-btn');

  expect(drinksLink).toBeInTheDocument();
  expect(mealsLink).toBeInTheDocument();

  expect(screen.getByAltText('drink icon')).toBeInTheDocument();
  expect(screen.getByAltText('meals icon')).toBeInTheDocument();
});
