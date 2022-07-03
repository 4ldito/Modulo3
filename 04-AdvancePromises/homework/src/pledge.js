'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
    constructor(executor) {
        if (typeof executor !== 'function')
            throw new TypeError('executor is not a function');
        this._state = 'pending';
        this._value = undefined;
        this._handlerGroups = [];
        //esto se puede hacer con .bind o haciedno una función flecha para indicar que el this hace referencia a dónde fue declarada.
        executor((value) => this._internalResolve(value), this._internalReject.bind(this));
    }

    static resolve(data) {
        if (data instanceof $Promise) return data;
        const promise = new $Promise(() => { });
        promise._internalResolve(data)
        return promise;
    }

    static all(promises) {
        if (!Array.isArray(promises)) throw TypeError('promises should be an array');
        //const promise = new $Promise(()=> {});
        // const newData = promises.map((element) => {
        //     if (element instanceof $Promise) {
        //         return element._value;
        //     } else {
        //         return element
        //     }
        // });
        // Esta linea es lo mismo q lo de arriba pero mas simplificado.
        //const newData = promises.map((element) => element instanceof $Promise ? element._value : element);
        //promise._internalResolve(newData);
        const p = new $Promise((resolve, reject) => {
            const totalPromises = promises.length;
            let resolvedPromises = 0;
            const results = new Array(totalPromises);
            promises.forEach((promise, index) => {
                if (promise instanceof $Promise) {
                    promise.then((value) => {
                        resolvedPromises++;
                        results[index] = value;
                        console.log('P Agregando el value', value);
                        console.log('P results despues de insertar', results);
                        if (totalPromises === resolvedPromises) resolve(results);
                    }, reject);
                } else {
                    resolvedPromises++;
                    results[index] = promise;
                    console.log('P Agregando el elemento', promise);
                    console.log('P results despues de insertar', results);
                    if (totalPromises === resolvedPromises) resolve(results);
                }
            })
        });
        const promise = new $Promise((resolve, reject) => {
            // const newData = promises.map((element) =>  element instanceof $Promise ? element._value : element);
            //const totalPromises = promises.length;
            //let resolvedPromises = 0;
            //const newData = new Array(totalPromises);
            const newData = [];
            promises.forEach((element, i) => {
                if (element instanceof $Promise) {
                    element.then(function (value) {
                        //resolvedPromises++
                        newData[i] = value;
                        console.log('PROMISE Agregando el value', value);
                        console.log('PROMISE newData despues de insertar', newData);
                        if (newData.length === promises.length) resolve(newData);
                    }, reject)
                } else {
                    //resolvedPromises++;
                    newData[i] = element;
                    console.log('PROMISE Agregnado el elemento', element);
                    console.log('PROMISE newData despues de insertar', newData);
                    if (newData.length === promises.length) resolve(newData);
                }
            });

        });
        // Por alguna razon no funciona con promise, pero si con P cuando hacen practicamente el mismo comportamiento. 
        console.log('p', p);
        console.log('promise', promise);
        console.log('/////////////');
        return p;
    }
    then(onFulfilled, onRejected) {
        const downstreamPromise = new $Promise(function () { });
        this._handlerGroups.push({
            successCb: (typeof onFulfilled === 'function') ? onFulfilled : false,
            errorCb: (typeof onRejected === 'function') ? onRejected : false,
            downstreamPromise
        });
        if (this._state !== 'pending')
            this._callHandlers();

        return downstreamPromise;
    }

    catch(error) {
        return this.then(null, error);
    }

    _internalResolve(info) {
        if (this._state === 'pending') {
            this._value = info;
            this._state = 'fulfilled';
            this._callHandlers();
        }
    }

    _internalReject(reason) {
        if (this._state === 'pending') {
            this._value = reason;
            this._state = 'rejected';
            this._callHandlers();
        }
    }

    _callHandlers() {
        if ((this._state !== 'pending') && (this._handlerGroups.length > 0)) {
            // Copiamos la variable handlerGroups para una mejor lectura
            const groups = this._handlerGroups;
            if (this._state === 'rejected') {
                // const indexError = groups.findIndex((g) => g.errorCb !== false);
                // if (indexError >= 0) groups[indexError].errorCb(this._value);
                // groups.forEach(group => {
                groups.forEach(({ errorCb, downstreamPromise }) => {
                    if (errorCb) {
                        try {
                            const result = errorCb(this._value);
                            if (result instanceof $Promise) {
                                result.then(
                                    (value) => downstreamPromise._internalResolve(value),
                                    (value) => downstreamPromise._internalReject(value)
                                );
                            } else {
                                downstreamPromise._internalResolve(result);
                            }
                        } catch (error) {
                            downstreamPromise._internalReject(error);
                        }

                    } else {
                        downstreamPromise._internalReject(this._value);
                    }
                });
            } else { // Si el estado de la promesa es fulfilled: 
                // groups.forEach(group => {
                groups.forEach(({ successCb, downstreamPromise }) => {
                    if (successCb) { //si el then tiene un succesCb
                        try {
                            const result = successCb(this._value);
                            if (result instanceof $Promise) {
                                result.then(
                                    (value) => downstreamPromise._internalResolve(value),
                                    (value) => downstreamPromise._internalReject(value)
                                );
                            } else {
                                downstreamPromise._internalResolve(result);
                            }
                        } catch (error) {
                            downstreamPromise._internalReject(error);
                        }
                    } else { // si el then no tiene un succesCb
                        downstreamPromise._internalResolve(this._value);
                    }
                });
            }
            this._handlerGroups = [];
        }
    }
}

module.exports = $Promise;

// class $Promise {
//     constructor(executor) {
//         if (typeof executor !== 'function') throw new TypeError('executor is not a function');
//         this._state = 'pending';
//         this._value = undefined;
//         this._handlerGroups = [];
//         //esto se puede hacer con .bind o haciedno una función flecha para indicar que el this hace referencia a dónde fue declarada.
//         executor((value) => this._internalResolve(value), this._internalReject.bind(this));

//     }

//     then(onFulfilled, onRejected) {
//         if (typeof onFulfilled !== 'function') onFulfilled = false;
//         if (typeof onRejected !== 'function') onRejected = false;
//         this._handlerGroups.push({ successCb: onFulfilled, errorCb: onRejected });
//         this._callHandlers();
//     }

//     catch(error) {
//         this.then(null, error);
//     }

//     _internalResolve(info) {
//         if (this._state === 'pending') {
//             this._value = info;
//             this._state = 'fulfilled';
//             this._callHandlers();
//         }
//     }

//     _internalReject(reason) {
//         if (this._state === 'pending') {
//             this._value = reason;
//             this._state = 'rejected';
//             this._callHandlers();
//         }
//     }

//     _callHandlers() {
//         if ((this._state !== 'pending') && (this._handlerGroups.length > 0)) {
//             // Copiamos la variable handlerGroups para una mejor lectura
//             const groups = this._handlerGroups;
//             if (this._state === 'rejected') {
//                 // const indexError = groups.findIndex((g) => g.errorCb !== false);
//                 // if (indexError >= 0) groups[indexError].errorCb(this._value);
//                 groups.forEach(group => {
//                     if (group.errorCb) group.errorCb(this._value);
//                 });
//             } else {
//                 groups.forEach(group => {
//                     if (group.successCb) group.successCb(this._value);
//                 });
//             }
//             this._handlerGroups = [];
//         }
//     }
// }



/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

let $Promise = require('pledge');
…
let promise = new $Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
