export default function getRefs() {
  return {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('ul.country-list'),
    countryInfo: document.querySelector('div.country-info'),
  };
}
