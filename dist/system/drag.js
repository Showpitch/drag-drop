System.register(['aurelia-framework'], function (_export) {
    'use strict';

    var inject, bindable, customAttribute, Drag;

    var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            bindable = _aureliaFramework.bindable;
            customAttribute = _aureliaFramework.customAttribute;
        }],
        execute: function () {
            Drag = (function () {
                var _instanceInitializers = {};
                var _instanceInitializers = {};

                _createDecoratedClass(Drag, [{
                    key: 'type',
                    decorators: [bindable],
                    initializer: function initializer() {
                        return {};
                    },
                    enumerable: true
                }, {
                    key: 'model',
                    decorators: [bindable],
                    initializer: function initializer() {
                        return {};
                    },
                    enumerable: true
                }], null, _instanceInitializers);

                function Drag(element) {
                    _classCallCheck(this, _Drag);

                    _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

                    _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);

                    this.element = element;

                    this.element.draggable = true;

                    for (var i = 0; i < this.element.children.length; i++) {
                        this.element.children[i].draggable = false;
                    }
                }

                _createDecoratedClass(Drag, [{
                    key: 'dragstartHandler',
                    value: function dragstartHandler(e) {
                        $(this.element).addClass('dragging');
                        $('body').addClass(this.type + '-dragging');
                        e.dataTransfer.setData("object", JSON.stringify({ type: this.type, model: this.model }));
                    }
                }, {
                    key: 'dragHandler',
                    value: function dragHandler() {}
                }, {
                    key: 'dragendHandler',
                    value: function dragendHandler() {
                        $(this.element).removeClass('dragging');
                        $('body').removeClass(this.type + '-dragging');
                    }
                }, {
                    key: 'bind',
                    value: function bind() {
                        var _this = this;

                        this.element.addEventListener('dragstart', function (e) {
                            _this.dragstartHandler(e);
                        });

                        this.element.addEventListener('drag', function () {
                            _this.dragHandler();
                        });

                        this.element.addEventListener('dragend', function () {
                            _this.dragendHandler();
                        });
                    }
                }, {
                    key: 'unbind',
                    value: function unbind() {
                        this.element.removeEventListener('dragstart');
                        this.element.removeEventListener('drag');
                        this.element.removeEventListener('dragend');
                    }
                }], null, _instanceInitializers);

                var _Drag = Drag;
                Drag = inject(Element)(Drag) || Drag;
                Drag = customAttribute('drag')(Drag) || Drag;
                return Drag;
            })();

            _export('Drag', Drag);
        }
    };
});