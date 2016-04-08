'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _drag = require('./drag');

Object.defineProperty(exports, 'Drag', {
  enumerable: true,
  get: function get() {
    return _drag.Drag;
  }
});

var _drop = require('./drop');

Object.defineProperty(exports, 'Drop', {
  enumerable: true,
  get: function get() {
    return _drop.Drop;
  }
});

function configure(config) {
  config.globalResources('./drag', './drop');
}