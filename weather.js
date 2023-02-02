#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  DICTIONARY,
  getKeyValue,
} from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (typeof city !== 'string') {
    printError('Не верно указан город');
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.city, city);
    printSuccess('Город сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather(
      process.env.CITY ?? (await getKeyValue(DICTIONARY.city))
    );
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('404: Неверно указан город');
    } else if (e?.response?.status === 401) {
      printError('401: Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
};

function initCLI() {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.c) {
    saveCity(args.c);
  }
  if (args.t) {
    saveToken(args.t);
  }
  getForcast();
}
initCLI();
