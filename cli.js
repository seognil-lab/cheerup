#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const shuffle = require('knuth-shuffle-seeded');
const mantras = require('./mantras');

const configFile = './.config.js';
const { mantraOfDay, lastUpdateDay, lastUpdateTime } = require('./.config.js');

const version = require('./package.json').version;

// * ---------------------------------------------------------------- program conifg

program.version(version);
program.option('-D, --daily', 'random every day');
// program.option('-F, --frequency', 'set random frequency by seconds'); // maybe later
// program.option('-S, --shuffle', 're-generate random list of daily'); // useless
program.command('*').action(() => program.help());
program.parse(process.argv);

// * ---------------------------------------------------------------- helper

const dayOfNow = () => ~~(Date.now() / 86400 / 1000);
const outdate = (a, b) => Math.abs(a - b) > 0;

// * ---------------------------------------------------------------- regeneration function

// * this function generate a shuffled list for daily pick
// * It's not the best implement, but it works

const regen = () => {
  const nextMantra = mantras[~~(Math.random() * mantras.length)];
  const genResult = `
      const mantraOfDay = '${nextMantra}';
      const lastUpdateDay = ${dayOfNow()};
      const lastUpdateTime = "${Date.now()}";
      module.exports = { mantraOfDay, lastUpdateDay, lastUpdateTime };
    `;
  fs.writeFile(path.resolve(__dirname, configFile), genResult, (err) => {
    err && console.warn(err);
  });
  return nextMantra;
};

// * ---------------------------------------------------------------- pick a mantra

let theMantra;

if (program.daily) {
  // TODO frequency // seognil LC 2019/05/29
  program.frequency = 'day';

  // * ---------------- checkDailyUpdate
  const willGenNext = !lastUpdateDay || outdate(dayOfNow(), lastUpdateDay);

  theMantra = willGenNext ? regen() : mantraOfDay;
} else {
  // * ---------------- pick random
  theMantra = mantras[~~(Math.random() * mantras.length)];
}

// * ---------------------------------------------------------------- show picked mantra

console.log(theMantra);
