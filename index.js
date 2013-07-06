/**
 * find the first item in the range to validate the predicate
 */
module.exports = function disect(min, max, fn) {
  var index;
  var tested = {};

  function test (i) {
    if(typeof tested[i] === 'undefined') {
      return tested[i] = fn(i);
    }
    else {
      return tested[i];
    }
  }

  while(max > min +1) {
    index = min + Math.floor((max - min) / 2);
    console.log('iteration with ', min, max, index)
    // true if what we're looking for is lower
    // false if what we're looking for is higher
    if(test(index)) {
      max = index;
    }
    else {
      min = index;
    }
  }
  if(index === max) {
    return test(min) ? min : max;
  }
  else {
    return index;
  }
};
