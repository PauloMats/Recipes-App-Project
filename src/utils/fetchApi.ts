async function fetchAPi(url: string) {
  const response = await fetch(url);
  const { meals } = await response.json();
  return meals;
}

export default fetchAPi;
