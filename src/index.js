import './css/styles.css';
import API from './js/ipa-countrys';
import getRefs from './js/refs-elements';
import countryCardTpl from './templates/county-card.hbs';
import countryListTpl from './templates/countu-list.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(e) {
  e.preventDefault();

  const countryName = refs.searchBox.value.trim();

  if (countryName === '') {
    onClearMarkup();
    return;
  }

  API.fetchCountrys(countryName).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(countrys) {
  if (countrys.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    onClearMarkup();
    return;
  }

  if (countrys.length <= 10) {
    const markup = countryListTpl(countrys);
    refs.countryList.innerHTML = markup;
    refs.countryInfo.innerHTML = '';
  }

  if (countrys.length === 1) {
    const markup = countryCardTpl(countrys);
    refs.countryInfo.innerHTML = markup;
    refs.countryList.innerHTML = '';
  }
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
  onClearMarkup();
  return error;
}

function onClearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
