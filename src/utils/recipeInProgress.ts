function handleButton(recipe: any, id: any, isMeal: any, navigate:any) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const eachTag = recipe.flatMap((item: any) => {
    if (item.strTags) {
      return item.strTags.split(',').map((tag: any) => tag?.trim());
    }
    return [];
  });
  const done = {
    id,
    type: isMeal ? 'meal' : 'drink',
    nationality: recipe[0].strArea || '',
    category: recipe[0].strCategory,
    alcoholicOrNot: recipe[0].strAlcoholic || '',
    name: recipe[0].strMeal || recipe[0].strDrink,
    image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
    doneDate: new Date().toISOString(),
    tags: eachTag,
  };
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, done]));
  navigate('/done-recipes');
}

export default handleButton;

export function newFavorite(favoriteRecipes: any, id: any) {
  const updatedFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  return updatedFavorites;
}

export function checkInput(name: any, isMeal: any, IngredientsLocal: any, idKey: any) {
  const progressKey = isMeal ? 'meals' : 'drinks';
  const savedProgress = IngredientsLocal[progressKey]?.[idKey]?.[0]
    .map((item: any) => item?.trim());
  const isInLocalStorage = savedProgress.includes(name?.trim());
  return !(isInLocalStorage);
}
