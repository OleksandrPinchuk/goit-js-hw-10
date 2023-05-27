import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    clearHtml();
    const countryInput = e.target.value.trim();
    if (countryInput !== '') {
        fetchCountries(countryInput)
        .then(data => murkupCountry(data))
            .catch(error =>
                Notify.failure('Oops, there is no country with that name.'));
    };
};

function murkupCountry(data) {
    if (data.length > 10) {
        Notify.info(`Too many matches found. Please enter a more specific name.`);
        return;
    } else if (data.length >= 2 && data.length <= 10) {
        markupCountryList(data);
        return;
    } else {
        markupFoundCountry(data);
        return;
    }
};

function markupCountryList(data) {
    const markupListEl = data.map(country => {
        return `<li>
                    <img class="country-list__flag" src="${country.flags.svg}" alt="${country.flags.alt}" width="120px">
                    <p class="country-list__name">${country.name.official}</p>
                </li>`;
    }).join('');
    refs.countryList.innerHTML = markupListEl;
};

function markupFoundCountry(data) {
    const markupCountryInfo = data.map(item => {
        return`<div class="country-wraper">
                    <img class="country-info__flag" src="${item.flags.svg}" alt="${item.flags.alt}" width="120px" >
                    <p class="country-info__name">${item.name.official}</p>
                </div>
                <ul>
                    <li>
                        <p class="country-info__txt">Capital: ${item.capital}</p>
                    </li>
                    <li>
                        <p class="country-info__txt">Population: ${item.population}</p>
                    </li>
                    <li>
                        <p class="country-info__txt">Languages: ${Object.values(item.languages).join()}</p>
                    </li>
                </ul>`
    }).join()
    refs.countryInfo.innerHTML = markupCountryInfo;
};

function clearHtml() {
    refs.countryList.innerHTML = ``;
    refs.countryInfo.innerHTML = ``;
};
