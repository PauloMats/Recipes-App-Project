import userEvent from '@testing-library/user-event';
import Login from '../Pages/pages/Login';
import renderWithRouter from '../Helper/renderWihtRouter';

test('O formulário de login é renderizado corretamente', () => {
  const { getByTestId, getByText } = renderWithRouter(<Login />);

  const loginButton = getByTestId('login-submit-btn');
  const emailInput = getByTestId('email-input');
  const loginTexto = getByText('Login');
  const passwordInput = getByTestId('password-input');

  expect(loginButton).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(loginTexto).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('Validação de email e senha', async () => {
  const { getByTestId } = renderWithRouter(<Login />);

  const loginButton = getByTestId('login-submit-btn');
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  await userEvent.type(emailInput, 'itsmenunes@gmail.com');
  await userEvent.type(passwordInput, '1234567');
  await userEvent.click(loginButton);
});
