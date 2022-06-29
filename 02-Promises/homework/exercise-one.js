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

let args = process.argv.slice(0).map(function (st) {
  return st.toUpperCase();
});

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * A. loguea el poema uno stanza uno (ignorá errores)
   */
  // callback version
  // readFile('poem-one/stanza-01.txt', function (err, stanza) {
  //   console.log('-- A. callback version --');
  //   blue(stanza);
  // });
  //promise version
  promisifiedReadFile('poem-one/stanza-01.txt').then(data => {
    console.log('-- A. promise version --');
    blue(data);
  });
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * B. loggea el poema uno stanza dos y tres, en cualquier orden
   *    (ignora errores)
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
  // promise version
  console.log('-- B. promise version (stanza two) --');
  promisifiedReadFile('poem-one/stanza-02.txt').then(data => {
    blue(data);
  });

  promisifiedReadFile('poem-one/stanza-03.txt').then(data => {
    blue(data);
  });

}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * C. lee & loggea el poema uno stanza dos y *DESPUES* lee & loggea
   *    stanza tres. Loggea 'done' cuando ambas hayan terminado. Fijate
   *    que los specs estan opinionados y espera la palabra exacta
   *    'done' (case sensitive) para ser loggeada para poder pasar
   *    (ignora errores)
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

  // promise version (hint: don't need to nest `then` calls)
  promisifiedReadFile('poem-one/stanza-02.txt').then(data => {
    console.log('-- C. promise version (stanza two) --');
    blue(data);
    return promisifiedReadFile('poem-one/stanza-03.txt');
  }).then(data => {
    blue(data);
    console.log('done');
  });
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea el poema uno stanza cuatro o un error si llega a ocurrir
   *
   */

  // callback version
  // readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
  //   console.log('-- D. callback version (stanza four) --');
  //   if (err) magenta(new Error(err));
  //   else blue(stanza4);
  // });

  // promise version
  // ???
  promisifiedReadFile('poem-one/wrong-file-name.txt').then(data => {
    console.log('-- D. promise version (stanza four) --');
    blue(data);
  }).catch(error => {
    magenta(new Error(error));
  });
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * E. Lee y loggea el poema uno stanza tres y *DESPUES* lee y loggea la
   *    stanza cuatro o loggea un error si llegase a ocurrir para
   *    cuaquiera de las lecturas
   */
  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- E. callback version (stanza three) --');
  //   if (err) return magenta(new Error(err));
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- E. callback version (stanza four) --');
  //     if (err2) return magenta(new Error(err2));
  //     blue(stanza4);
  //   });
  // });
  // promise version
  promisifiedReadFile('poem-one/stanza-03.txt').then(stanza3 => {
    console.log('-- E. promise version (stanza three) --');
    blue(stanza3);
    return promisifiedReadFile('poem-one/wrong-file-name.txt');
  }).then(stanza4 => {
    console.log('-- E. callback version (stanza four) --');
    blue(stanza4)
  }).catch(error => {
    magenta(new Error(error));
  });
}

function problemF() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * F. Lee & loggea el poema uno stanza tres y *DESPUES* lee y loguea la
   *    stanza cuatro o loggea un error si occrre para cualquiera de las
   *    lecturas y siempre loggea 'done' cuando todo haya terminado
   */
  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- F. callback version (stanza three) --');
  //   if (err) {
  //     magenta(new Error(err));
  //     console.log('-- F. callback version done --');
  //     return;
  //   }
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- F. callback version (stanza four) --');
  //     if (err2) magenta(new Error(err2));
  //     else blue(stanza4);
  //     console.log('-- F. callback version done --');
  //   });
  // });
  // promise version
  promisifiedReadFile('poem-one/stanza-03.txt').then(stanza3 => {
    console.log('-- F. promise version (stanza three) --');
    blue(stanza3);
    return promisifiedReadFile('poem-one/wrong-file-name.txt');
    //return promisifiedReadFile('poem-one/stanza-04.txt');
  }).then(stanza4 => {
    console.log('-- F. callback version (stanza four) --');
    blue(stanza4);
    console.log('done');
  }).catch(error => {
    magenta(new Error(error));
    console.log('done');
  });
}

module.exports = {
  problemA,
  problemB,
  problemC,
  problemD,
  problemE,
  problemF
};