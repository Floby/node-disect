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
}.withDomain(true);

