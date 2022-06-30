'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:


class $Promise {

    constructor(executor) {
        if (typeof executor !== 'function') throw new TypeError('executor is not a function');
        this._state = 'pending';
        this._value = undefined

        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    }

    _internalResolve(info) {
        if (this._state === 'pending') {
            this._value = info;
            this._state = 'fulfilled';
        }
    }

    _internalReject(reason) {
        if (this._state === 'pending') {
            this._value = reason;
            this._state = 'rejected';
        }
    }

}




module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
