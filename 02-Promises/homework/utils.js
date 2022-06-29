'use strict';

let fs = require('fs');
let Promise = require('bluebird');
let chalk = require('chalk');

let utils = {};

utils.readFile = function (filename, callback) {
	let randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

utils.writeFile = function (filename, str, callback) {
	let randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.writeFile(filename, str, 'utf-8', (err) => {
			if (err) callback(err);
			else callback(null, 'Se escribio en el archivo el siguiente texto\n' + str)
		});
	}, randExtraTime);
};

utils.promisifiedWriteFile = (filename, str) => {
	return new Promise((resolve, reject) => {
		utils.writeFile(filename, str, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

utils.promisifiedReadFile = function (filename) {
	return new Promise((resolve, reject) => {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

utils.blue = function (text) {
	console.log(chalk.blue(text));
};

utils.magenta = function (text) {
	console.error(chalk.magenta(text));
};

module.exports = utils;
