import React from 'react';
import { vi } from 'vitest';
import { render, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import renderWithRouter from '../Helper/renderWihtRouter';
import Header from '../components/Header';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';

describe('Header Component', () => {
  it('renderiza o título do header', () => {
    const { getByTestId } = renderWithRouter(<Header title="Test Title" profileTrue={ false } searchTrue={ false } />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Test Title');
  });

  it('renderiza o botão search quando o valor for true', () => {
    const { getByTestId } = renderWithRouter(<Header title="Test Title" searchTrue profileTrue />);
    const searchButton = getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeInTheDocument();
  });

  it('não renderiza o botão search quando o valor for false', () => {
    const { queryByTestId } = renderWithRouter(<Header title="Test Title" searchTrue={ false } profileTrue />);
    const searchButton = queryByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeNull();
  });

  it('renderiza o botão profile quando o valor for true', () => {
    const { getByTestId } = renderWithRouter(<Header title="Test Title" profileTrue searchTrue={ false } />);
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  it('deve chamar setShowSearchBar quando o botão de pesquisa é clicado', () => {
    const { getByTestId } = renderWithRouter(<Header title="Test Title" searchTrue profileTrue />);
    const searchButton = getByTestId(SEARCH_TOP_BTN);

    fireEvent.click(searchButton);
  });
});
