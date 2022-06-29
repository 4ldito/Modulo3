'use strict';
let Promise = require('bluebird'),
  async = require('async'),
  exerciseUtils = require('./utils');

let readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta,
  promisifiedWriteFile = exerciseUtils.promisifiedWriteFile;

let args = process.argv.slice(2).map(function (st) { return st.toUpperCase(); });
// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   */
  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );
  // promise version

  // Haciendo esto, nos permitimos que se ejecute cualquiera de las dos promesas primero.
  const promiseOne = promisifiedReadFile('poem-two/stanza-01.txt').then((stanza) => blue(stanza));
  const promiseTwo = promisifiedReadFile('poem-two/stanza-02.txt').then((stanza) => blue(stanza));


  // Promise.all([promisifiedReadFile('poem-two/stanza-01.txt'), promisifiedReadFile('poem-two/stanza-02.txt')])
  Promise.all([promiseOne, promiseTwo]) // Y luego, cuando terminen todas las promesas, imprimimos el done
    .then(values => {
      // values.forEach(stanza => {
      //   blue(stanza);
      // });
      console.log('done');
    });
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   */
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    //return 'poem-two/' + 'stanza-0' + n + '.txt';
    return `poem-two/stanza-0${n}.txt`;
  });

  const promises = filenames.map((file) => promisifiedReadFile(file).then((stanza) => blue(stanza)))

  Promise.all(promises).then(() => {
    console.log('done');
  });

  /*Promise.mapSeries(filenames, (filename) => {
    return promisifiedReadFile(filename);
  }).then(values => {
    values.forEach((stanza) => {
      blue(stanza);

    });
    console.log('done');
  }); */

  // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );
  // promise version
}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   */
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });


  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );
  // promise version
  Promise.mapSeries(filenames, (filename) => {
    return promisifiedReadFile(filename);
  }).then(values => {
    values.forEach((stanza, i) => {
      blue(stanza);
    });
    console.log('done');
  });
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   */
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';
  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );
  // promise version
  Promise.mapSeries(filenames, (filename) => {
    return promisifiedReadFile(filename);
  })
    .then(values => {
      values.forEach((stanza) => {
        blue(stanza);
      });
      // console.log('done'); 
    })
    .catch(err => {
      magenta(new Error(err));
      // console.log('done');
    })
    .finally(() => console.log('done'));
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * E. Haz una versión promisificada de fs.writeFile
   */

  const filename = 'prueba.txt';
  const str = 'Probando escribir en el archivo'

  promisifiedWriteFile(filename, str).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  });

}

problemE();

module.exports = {
  problemA,
  problemB,
  problemC,
  problemD,
  problemE
};