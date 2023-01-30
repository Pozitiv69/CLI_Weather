#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
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
    // printC
  }
  if (args.t) {
    saveToken(args.t);
  }
}
initCLI();
