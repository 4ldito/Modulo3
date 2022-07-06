/*********** Yo explico `exerciseUtils` ********
*
* excersiceUtils es una variable que viene de un archivo en este repo
* El archivo `./utils` esta en este nivel y se llama `utils.js`
*
* Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
*
* Las funciones `blue` y `magenta` para mantener tu código DRY
*
***********************************************/

'use strict';

let Promise = require('bluebird'),
  exerciseUtils = require('./utils');

let readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

let args = process.argv.slice(2).map(function (st) { return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF,
  syncFunction
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports['problem' + arg];
  if (problem) problem();
});

async function syncFunction(file) {
  const stanza = await promisifiedReadFile(file);
  blue(stanza);
}

async function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loguea el poema uno stanza uno (ignorá errores)
   *
   */

  // callback version
  // readFile('poem-one/stanza-01.txt', function (err, stanza) {
  //   console.log('-- A. callback version --');
  //   blue(stanza);
  // });

  // AsyncAwait version
  const stanza = await promisifiedReadFile('poem-one/stanza-01.txt');
  blue(stanza);

}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea el poema uno stanza dos y tres, en cualquier orden
   *    (ignora errores)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- B. callback version (stanza two) --');
  //   blue(stanza2);
  // });
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- B. callback version (stanza three) --');
  //   blue(stanza3);
  // });

  // AsyncAwait version
  syncFunction('poem-one/stanza-02.txt');
  syncFunction('poem-one/stanza-03.txt');
}

async function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. lee & loggea el poema uno stanza dos y *DESPUES* lee & loggea
   *    stanza tres. Loggea 'done' cuando ambas hayan terminado. Fijate
   *    que los specs estan opinionados y espara la palabra exacata
   *    'done' (case sensitive) para ser loggeada para poder pasar
   *    (ignora errores)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- C. callback version (stanza two) --');
  //   blue(stanza2);
  //   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //     console.log('-- C. callback version (stanza three) --');
  //     blue(stanza3);
  //     console.log('-- C. callback version done --');
  //   });
  // });

  // AsyncAwait version

  const promise = promisifiedReadFile('poem-one/stanza-02.txt');
  const promise2 = promisifiedReadFile('poem-one/stanza-03.txt');
  const [stanzaTwo, stanzaThree] = await Promise.all([promise, promise2]);

  blue(stanzaTwo);
  blue(stanzaThree);

}

async function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea el poema uno stanza cuatro o un error si llega a ocurrir
   *
   */

  // callback version
  // readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
  //   console.log('-- D. callback version (stanza four) --');
  //   if (err) magenta(err);
  //   else blue(stanza4);
  // });

  // AsyncAwait version
  try {
    const stanzaFour = await promisifiedReadFile('poem-one/wrong-file-name.txt');
    blue(stanzaFour)
  } catch (error) {
    magenta(error);
  }
}

async function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Lee y loggea el poema uno stanza tres y *DESPUES* lee y loggea la
   *    stanza cuatro o loggea un error si llegase a ocurrir para
   *    cuaquiera de las lecturas
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- E. callback version (stanza three) --');
  //   if (err) return magenta(err);
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- E. callback version (stanza four) --');
  //     if (err2) return magenta(err2);
  //     blue(stanza4);
  //   });
  // });

  // AsyncAwait version
  try {
    const promise = promisifiedReadFile('poem-one/stanza-03.txt');
    const promise2 = promisifiedReadFile('wrong-file-name.txt');
    const [stanzaTwo, stanzaThree] = await Promise.all([promise, promise2]);
    blue(stanzaTwo);
    blue(stanzaThree);
  } catch (error) {
    magenta(error);
  }

}

async function problemF() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. Lee & loggea el poema uno stanza tres y *DESPUES* lee y loguea la
   *    stanza cuatro o loggea un error si occrre para cualquiera de las
   *    lecturas y siempre loggea 'done' cuando todo haya terminado
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- F. callback version (stanza three) --');
  //   if (err) {
  //     magenta(err);
  //     console.log('-- F. callback version done --');
  //     return;
  //   }
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- F. callback version (stanza four) --');
  //     if (err2) magenta(err2);
  //     else blue(stanza4);
  //     console.log('-- F. callback version done --');
  //   });
  // });

  // AsyncAwait version

  try {
    const promise = promisifiedReadFile('poem-one/stanza-03.txt');
    const promise2 = promisifiedReadFile('wrong-file-name.txt');
    const [stanzaTwo, stanzaThree] = await Promise.all([promise, promise2]);
    blue(stanzaTwo);
    blue(stanzaThree);
  } catch (error) {
    magenta(error);
  } finally {
    console.log('done');
  }

}
