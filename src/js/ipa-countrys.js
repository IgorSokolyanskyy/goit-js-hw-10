const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages';

function fetchCountrys(name) {
  return fetch(`${BASE_URL}${name}${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
export default { fetchCountrys };
