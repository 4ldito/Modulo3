'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:


class $Promise {
    constructor(executor) {
        if (typeof executor !== 'function') throw new TypeError('executor is not a function');
        this._state = 'pending';
        this._value = undefined;
        this._handlerGroups = [];
        //esto se puede hacer con .bind o haciedno una función flecha para indicar que el this hace referencia a dónde fue declarada.
        executor((value) => this._internalResolve(value), this._internalReject.bind(this));

    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') onFulfilled = false;
        if (typeof onRejected !== 'function') onRejected = false;
        this._handlerGroups.push({ successCb: onFulfilled, errorCb: onRejected });
        this._callHandlers();
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
        }
    }

    _callHandlers() {
        if ((this._state !== 'pending') && (this._handlerGroups.length > 0)) {
            // Ejecutamos el primer elemento y luego lo removemos.
            this._handlerGroups.forEach(group => {
                if (group.successCb) group.successCb(this._value);
                if (group.errorCb) group.errorCb(this._value);
            });

            this._handlerGroups = [];
        }
    }
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

let $Promise = require('pledge');
…
let promise = new $Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
