'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

function configure(config) {
  config.globalResources('./drag');
  config.globalResources('./drop');
}