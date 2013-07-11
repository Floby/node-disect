var bisect = require('../');
var domain = require('domain');

Function.prototype.withDomain = function(withStack) {
  var fn = this;
  return function(test) {
    var d = domain.create();
    d.on('error', function(e) {
      test.fail('test failed with ' + e.message);
      if(withStack) {
        console.error(e.stack)
      }
      test.done();
    });
    d.run(fn.bind(this, test));
  }
}


exports['test find 1 in 0..10 asynchronously'] = function (test) {
  var called = false;
  var expected = 1;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(index >= expected);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 1 at index 1");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test find 4 in 0..10 asynchronously'] = function (test) {
  var called = false;
  var expected = 4;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(index >= expected);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 4 at index 4");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test find 3 in 0..10 asynchronously'] = function (test) {
  var called = false;
  var expected = 3;
  test.expect(2 + 3); // 3 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(index >= expected);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 3 at index 3");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test find 6 in 0..10 asynchronously'] = function (test) {
  var called = false;
  var expected = 6;
  test.expect(2 + 3); // 3 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(index >= expected);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 6 at index 6");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test find first item asynchronously'] = function (test) {
  var called = false;
  var expected = 0;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(true);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 0 at index 0");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test find last item asynchronously'] = function (test) {
  var called = false;
  var expected = 9;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(index >= expected);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 9 at index 9");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

exports['test no matching asynchronously'] = function (test) {
  var called = false;
  var expected = 10;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index, callback) {
    test.ok(true, "We should get called");
    called = true;
    setImmediate(function () {
      callback(false);
    })
  }, function (actual) {
    test.equal(expected, actual, "We should find 10");
    test.ok(called, "We should have called our predicate");
    test.done();
  });
}.withDomain();

