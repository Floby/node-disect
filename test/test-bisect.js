var bisect = require('../');

exports['test find 4 in 0..10'] = function (test) {
  var called = false;
  var expected = 4;
  test.expect(2 + 4); // 4 iterations expected
  var actual = bisect(0, 10, function (index) {
    console.log('called with', index, 'returning', index >= expected);
    test.ok(true, "We should get called");
    called = true;
    return index >= expected;
  });
  test.equal(expected, actual, "We should find 4 at index 4");
  test.ok(called, "We should have called our predicate");
  test.done();
}

exports['test find 3 in 0..10'] = function (test) {
  var called = false;
  var expected = 3;
  test.expect(2 + 3); // 4 iterations expected
  var actual = bisect(0, 10, function (index) {
    console.log('called with', index, 'returning', index >= expected);
    test.ok(true, "We should get called");
    called = true;
    return index >= expected;
  });
  test.equal(expected, actual, "We should find 3 at index 3");
  test.ok(called, "We should have called our predicate");
  test.done();
}

exports['test find 6 in 0..10'] = function (test) {
  var called = false;
  var expected = 6;
  test.expect(2 + 3); // 3 iterations expected
  var actual = bisect(0, 10, function (index) {
    test.ok(true, "We should get called");
    called = true;
    return index >= expected;
  });
  test.equal(expected, actual, "We should find 6 at index 6");
  test.ok(called, "We should have called our predicate");
  test.done();
}

exports['test find first item'] = function (test) {
  var called = false;
  var expected = 0;
  test.expect(2 + 4); // 3 iterations expected
  var actual = bisect(0, 10, function (index) {
    test.ok(true, "We should get called");
    called = true;
    return true;
  });
  test.equal(expected, actual);
  test.ok(called, "We should have called our predicate");
  test.done();
}

exports['test find last item'] = function (test) {
  var called = false;
  var expected = 9;
  test.expect(2 + 4); // 3 iterations expected
  var actual = bisect(0, 10, function (index) {
    test.ok(true, "We should get called");
    called = true;
    return false;
  });
  test.equal(expected, actual);
  test.ok(called, "We should have called our predicate");
  test.done();
}
