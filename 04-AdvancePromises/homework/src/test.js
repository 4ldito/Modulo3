const $Promise = require("./pledge");


const obj = [1, 3, 4, 6, 7];

const num = obj.findIndex((n) => n === 4);

//console.log(obj[num]);


const promise = new Promise((resolve, reject) => {
    resolve('bien!');
});

promise.then().then().then((value) => {
    console.log(value);
})


// const pr = new Promise((resolve, reject) => {
//     resolve('foo');
// });


// pr.then((value) => {
//     console.log(value);
// })