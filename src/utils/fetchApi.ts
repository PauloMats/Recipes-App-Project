async function fetchAPi(url: string) {
  const response = await fetch(url);
  const { meals, drinks } = await response.json();
  return meals || drinks;
}

export default fetchAPi;
