function disect_sync (min, max, fn) {
  var array;
  var index;
  var tested = {};

  if(Array.isArray(min) && typeof fn === 'undefined') {
    array = min;
    min = 0;
    predicate = max;
    max = array.length;
    fn = function(index) {
      return predicate(array[index], index);
    }
  }

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
    // true if what we're looking for is lower
    // false if what we're looking for is higher
    if(test(index)) {
      max = index;
    }
    else {
      min = index;
    }
  }
  return test(min) ? min : max;
}

function disect_async (min, max, fn, result_callback) {
  var tested = {};
  var index;

  if(Array.isArray(min) && typeof result_callback === 'undefined') {
    array = min;
    min = 0;
    predicate = max;
    max = array.length;
    result_callback = fn;
    fn = function(index, callback) {
      predicate(array[index], index, callback);
    }
  }

  function test (i, cb) {
    if(typeof tested[i] === 'undefined') {
      fn(i, function (res) {
        tested[i] = res;
        cb(res);
      });
    }
    else {
      process.nextTick(cb.bind(this, tested[i]));
    }
  }

  function iterate () {
    if(min+1 >= max) {
      test(min, function (res) {
        if(res) result_callback(min);
        else result_callback(max);
      })
    }
    else {
      index = min + Math.floor((max-min) / 2);
      test(index, function (res) {
        if(res) {
          max = index;
        }
        else {
          min = index;
        }
        iterate();
      })
    }
  }
  process.nextTick(iterate);
}

/**
 * find the first item in the range to validate the predicate
 */
module.exports = function disect(min, max, fn, callback) {
  if (callback || arguments.length === 3 && max.length === 3) {
    disect_async(min, max, fn, callback);
    return;
  }
  else {
    return disect_sync(min, max, fn);
  }

};
