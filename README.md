Guard-function
============
[![Build Status](https://travis-ci.org/stoeffel/guard-function.svg)](https://travis-ci.org/stoeffel/guard-function) [![npm version](https://badge.fury.io/js/guard-function.svg)](http://badge.fury.io/js/guard-function)
![Gandalf](you-shall-not-pass.jpg)

> Guard a function using a predicate.

Installation
------------

`npm install guard-function`

Usage
-----

### Basic usage

```js
var guard = require('guard-function');

let capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Silently fail when non-string is passed in
capitalize = guard((str) => typeof str === 'string', capitalize);

capitalize(12); // => undefined
capitalize("you shall not pass!"); // => "You shall not pass!"

let div = (a, b) => a / b;

// Throw exception instead of failing silently by passing an Error instance as 3rd param
div = guard((a, b) => b !== 0, div, new Error('Divide by 0!');

div(8, 2); // => 4

div(8, 0); // => throws an Error
```
