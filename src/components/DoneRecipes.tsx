import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../utils/types';
import shareIcon from '../images/shareIcon.svg';
import '../css/DoneRecipes.css';

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

  return (
    <div className="done-page-container">
      <div className="done-filter-container">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="dones-container">
        {filterRecipes.map((recipe, index) => (
          <div className="done-card-container" key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { maxWidth: '150px', maxHeight: '150px' } }
              />
            </Link>
            <div className="row-container">
              <div className="col-container">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p
                    className="done-name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </p>
                </Link>
                { filterRecipes[index].type === 'meal' ? (
                  <p
                    className="done-info"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}

                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                )}
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}

                </p>
                {recipe.tags.map((tagName, tagIndex) => (
                  <p
                    key={ tagIndex }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </p>
                ))}
              </div>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => handleShareClick(recipe.id, recipe.type, index) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                />
              </button>
            </div>
            {copyIndex === index && <p>Link copied!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
