System.register(['./drag', './drop'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./drag', './drop');
  }

  return {
    setters: [function (_drag) {
      _export('Drag', _drag.Drag);
    }, function (_drop) {
      _export('Drop', _drop.Drop);
    }],
    execute: function () {}
  };
});