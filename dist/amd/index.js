define(['exports', './drag', './drop'], function (exports, _drag, _drop) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'Drag', {
    enumerable: true,
    get: function get() {
      return _drag.Drag;
    }
  });
  Object.defineProperty(exports, 'Drop', {
    enumerable: true,
    get: function get() {
      return _drop.Drop;
    }
  });

  function configure(config) {
    config.globalResources('./drag', './drop');
  }
});