#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const shuffle = require('knuth-shuffle-seeded');
const mantras = require('./sentences/mantras');
const { mantrasShuffled, lastUpdateTime, lastVersion } = require('./sentences/mantras-shuffled');

// * ---------------------------------------------------------------- program conifg

const version = '1.0.0';
program.version(version);
program.option('-D, --daily', 'random every day');
program.option('-S, --shuffle', 're-generate random list of daily');
program.command('*').action(() => program.help());
program.parse(process.argv);

// * ---------------------------------------------------------------- regeneration function

// * this function generate a shuffled list for daily pick
// * It's not the best implement, but it works

const regen = () => {
  const mantrasShuffledAgain = shuffle(mantras);
  const genResult = `
    const mantrasShuffled = [${mantrasShuffledAgain.map((e) => '"' + e + '"')}];
    const lastUpdateTime = ${Date.now()};
    const lastVersion = "${version}";
    module.exports = { mantrasShuffled, lastUpdateTime, lastVersion };
    `;
  fs.writeFile(path.resolve(__dirname, './sentences/mantras-shuffled.js'), genResult, (err) => {
    err && console.warn(err);
  });
  return mantrasShuffledAgain;
};

if (program.shuffle) {
  regen();
}

// * ---------------------------------------------------------------- pick a mantra

let nextMantra;

if (program.daily) {

  // * ---------------- checkDailyUpdate
  // * It's not the best implement, but it works
  const willGenShuffled =
    version !== lastVersion ||
    (mantrasShuffled.length !== mantras.length && Math.abs(Date.now() - lastUpdateTime) > 86400);

  let _mantrasShuffled = mantrasShuffled;
  if (willGenShuffled) {
    _mantrasShuffled = regen();
  }

  // * ---------------- pick from ensured daily list
  nextMantra = _mantrasShuffled[~~(Date.now() / 1000 / 3600 / 24) % mantras.length];

} else {

  // * ---------------- pick random
  nextMantra = mantras[~~(Math.random() * mantras.length)];

}

// * ---------------------------------------------------------------- show picked mantra

console.log(nextMantra);
