import axios from 'axios';
import https from 'https';
import { DICTIONARY, getKeyValue } from './storage.service.js';

const getWeather = async (city) => {
  const token = await getKeyValue(DICTIONARY.token);
  if (!token) {
    throw Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ua',
        units: 'metric',
      },
    }
  );
  return data;
  //Вариант 2
  // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  // url.searchParams.append('q', city);
  // url.searchParams.append('appid', token);
  // url.searchParams.append('lang', 'ru');
  // url.searchParams.append('units', 'metric');

  // https.get(url, (response) => {
  //   let res = '';
  //   response.on('data', (chunk) => {
  //     res += chunk;
  //   });
  //   response.on('end', () => {
  //     console.log(res);
  //   });
  // });
};

export { getWeather };
