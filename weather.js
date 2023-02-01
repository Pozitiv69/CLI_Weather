#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, DICTIONARY } from './services/storage.service.js';

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

function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    saveToken(args.t);
  }
  getWeather('vinnytsia');
}
initCLI();
