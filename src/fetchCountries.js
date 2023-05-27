const BASE_URL = 'https://restcountries.com/v3.1';
const fields = 'fields=name,capital,languages,population,flags';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?${fields}`)
        .then(response => response.json());
};