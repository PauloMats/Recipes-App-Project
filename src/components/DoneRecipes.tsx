import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../utils/types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [copyIndex, setCopyIndex] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes') || 'null') || []);
  }, []);

  const filterRecipes = recipes.filter((recipe) => {
    if (filter === 'all') return true;
    return recipe.type === filter;
  });

  const handleShareClick = (
    id: string,
    type: string,
    index: number,
  ) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {

        }, 3000);
      });
  };
