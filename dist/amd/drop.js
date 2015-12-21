define(['exports', 'aurelia-framework', 'aurelia-postbox'], function (exports, _aureliaFramework, _aureliaPostbox) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  var Drop = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Drop, [{
      key: 'target',
      decorators: [_aureliaFramework.bindable],
      initializer: function initializer() {
        return 'enable';
      },
      enumerable: true
    }, {
      key: 'handler',
      decorators: [_aureliaFramework.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'params',
      decorators: [_aureliaFramework.bindable],
      initializer: function initializer() {
        return {};
      },
      enumerable: true
    }], null, _instanceInitializers);

    function Drop(element, postBox) {
      _classCallCheck(this, _Drop);

      _defineDecoratedPropertyDescriptor(this, 'target', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'handler', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'params', _instanceInitializers);

      this.element = element;
      this.pb = postBox;
    }

    _createDecoratedClass(Drop, [{
      key: 'listen',
      value: function listen() {
        var _this = this;

        this.element.addEventListener('dragenter', function () {
          $(_this.element).addClass('drag-over');
        });

        this.element.addEventListener('dragover', function (e) {
          e.preventDefault();
        });

        this.element.addEventListener('dragleave', function () {
          $(_this.element).removeClass('drag-over');
        });

        this.element.addEventListener('drop', function (e) {
          e.preventDefault();

          $(_this.element).removeClass('drag-over');
          var data = JSON.parse(e.dataTransfer.getData('data'));
          _this.context[_this.handler](data, e, _this.params);
        });
      }
    }, {
      key: 'stopListening',
      value: function stopListening() {
        this.element.removeEventListener('dragenter');
        this.element.removeEventListener('dragover');
        this.element.removeEventListener('dragleave');
        this.element.removeEventListener('drop');
      }
    }, {
      key: 'bind',
      value: function bind(bindingContext, overrideContext) {
        var _this2 = this;

        this.context = typeof bindingContext[this.handler] === 'function' ? bindingContext : overrideContext.parentOverrideContext.bindingContext;

        this.pb.subscribe('drop-target', function (payload) {
          if (payload === _this2.target) {
            _this2.listen();
          } else {
            _this2.stopListening();
          }
        });
      }
    }, {
      key: 'unbind',
      value: function unbind() {
        this.stopListening();
      }
    }], null, _instanceInitializers);

    var _Drop = Drop;
    Drop = (0, _aureliaFramework.inject)(Element, _aureliaPostbox.PostBox)(Drop) || Drop;
    Drop = (0, _aureliaFramework.customAttribute)('drop')(Drop) || Drop;
    return Drop;
  })();

  exports.Drop = Drop;
});