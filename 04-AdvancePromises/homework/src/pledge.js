'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:


function $Promise(executor) {
    if (typeof executor !== 'function') throw new TypeError('executor is not a function');
    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = [];
    //esto se puede hacer con .bind o haciedno una función flecha para indicar que el this hace referencia a dónde fue declarada.
    executor((value) => this._internalResolve(value), this._internalReject.bind(this));
}

$Promise.prototype.then = function (onFulfilled, onRejected) {
    const downstreamPromise = new $Promise(function () { });
    this._handlerGroups.push({
        successCb: (typeof onFulfilled === 'function') ? onFulfilled : false,
        errorCb: (typeof onRejected === 'function') ? onRejected : false,
        downstreamPromise
    });
    if (this._state !== 'pending') this._callHandlers();

    return downstreamPromise;
}

$Promise.prototype.catch = function (error) {
    return this.then(null, error);
}

$Promise.prototype._internalResolve = function (info) {
    if (this._state === 'pending') {
        this._value = info;
        this._state = 'fulfilled';
        this._callHandlers();
    }
}

$Promise.prototype._internalReject = function (reason) {
    if (this._state === 'pending') {
        this._value = reason;
        this._state = 'rejected';
        this._callHandlers();
    }
}

$Promise.prototype._callHandlers = function () {
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
                    downstreamPromise._internalResolve(this._value)
                }
            });
        }
        this._handlerGroups = [];
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
