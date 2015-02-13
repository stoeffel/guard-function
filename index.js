"use strict";


var apply = function (fn, args) {
  return fn.apply(null, args);
};


module.exports = function (pred, fn, nothing) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return apply(pred, args) ? apply(fn, args) : nothing;
  };
};