import { render, fireEvent } from '@testing-library/react';
import Login from '../Pages/pages/Login';

describe('Validação do login', () => {
  const setup = () => {
    const renderResult = render(<Login />);
    const { getByTestId } = renderResult;
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');
    return { emailInput, passwordInput, submitButton };
  };

  test('O botão deve permanecer desativado se o e-mail for considerado inválido.', () => {
    const { emailInput, submitButton } = setup();
    fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });
    expect(submitButton).toBeDisabled();
  });

  test('O botão deve permanecer desativado caso a senha tenha 6 caracteres ou menos.', () => {
    const { passwordInput, submitButton } = setup();
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(submitButton).toBeDisabled();
  });

  test('O botão deve estar em estado ativo quando o e-mail e a senha forem considerados válidos.', () => {
    const { emailInput, passwordInput, submitButton } = setup();
    fireEvent.change(emailInput, { target: { value: 'usuario@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123456' } });
    expect(submitButton).not.toBeDisabled();
  });
});
