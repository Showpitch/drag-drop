System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./drag', './drop');
  }

  return {
    setters: [],
    execute: function () {}
  };
});