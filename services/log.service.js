import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen('SUCCESS') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`
    ${chalk.bgCyan('HELP')}
    Без параметров - вывод погоды
    -c [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent`
    ${chalk.bgGreenBright('WEATHER')}
    Погода в городе: ${res.name} ${res.weather[0].description} ${icon}  
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed}
    `
  );
};

export { printError, printSuccess, printHelp, printWeather };
