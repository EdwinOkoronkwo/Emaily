const chalk = require("chalk");

const logger = {
  log: (message) => {
    console.log(message);
  },
  success: (message) => {
    console.log(chalk.green(message));
  },
  error: (message) => {
    console.log(chalk.red(message));
  },
  info: (message) => {
    console.log(chalk.blue(message));
  },
  warning: (message) => {
    console.log(chalk.yellow(message));
  },
  notice: (message) => {
    console.log(chalk.cyan(message));
  },
  magentaBold: (message) => {
    console.log(chalk.bold.magenta(message));
  },
  bgRed: (message) => {
    console.log(chalk.bgRed(message));
  },
};

module.exports = logger;
