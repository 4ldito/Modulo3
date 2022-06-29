const fs = require("fs");


const promise = new Promise(
    (resolve, reject) => {
        fs.readFile('./archivo.txt', { encoding: 'utf-8' }, (error, file) => {
            if (error) {
                reject(error);
            }
            resolve(file);
        });
    });

console.log(promise); // Si imprimimos a promise en este punto, va a estar en pending
promise.then((value) => {
    console.log(value);
    console.log(promise); // Si imprimimos a promise en este punto, va a estar en Fulfilled.
}, (reject) => {
    console.log(reject);
    console.log(promise); // Si imprimimos a promise en este punto, va a estar en Rejected.
});

console.log(promise); // Si imprimimos a promise en este punto, va a estar en pending (todavía no se resolvió porque tarda)