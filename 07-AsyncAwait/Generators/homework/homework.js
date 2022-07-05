function* fizzBuzzGenerator(max) {
  // Tu código acá:

  if (!max) max = Infinity;

  for (let i = 1; i <= max; i++) {

    if (i % 5 === 0 && i % 3 === 0) yield 'Fizz Buzz';
    else if (i % 5 === 0) yield 'Buzz';
    else if (i % 3 === 0) yield 'Fizz';
    else yield i;
  }
  return;
}

module.exports = fizzBuzzGenerator;
