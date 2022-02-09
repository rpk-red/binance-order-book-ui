/* eslint-disable no-console */

export const logger = {
  debug: (...arg: string[]) => {
    console.log(new Date().toISOString(), "DEBUG", ...arg);
  },
  info: (...arg: string[]) => {
    console.log(new Date().toISOString(), "INFO", ...arg);
  },
  warn: (...arg: string[]) => {
    console.log(new Date().toISOString(), "WARN", ...arg);
  },
};
