/**
 * Created by ericjohnson on 12/7/15.
 */

import {inject, bindable, customAttribute} from 'aurelia-framework';

@customAttribute('drop')
@inject(Element)
export class Drop {

  @bindable handler;
  @bindable params = {};

  constructor(element) {
    this.element = element;
  }

  bind(bindingContext, overrideContext) {
    // set context
    this.context = typeof(bindingContext[this.handler]) === 'function' ? bindingContext : overrideContext.parentOverrideContext.bindingContext;


    // load listeners
    this.element.addEventListener('dragenter', () => {
      $(this.element).addClass('drag-over');
    });

    this.element.addEventListener('dragover', (e) => {
      // allow drop to happen
      e.preventDefault();
    });

    this.element.addEventListener('dragleave', () => {
      $(this.element).removeClass('drag-over');
    });

    this.element.addEventListener('drop', (e) => {
      // allow drop to happen
      e.preventDefault();

      // then handle
      $(this.element).removeClass('drag-over');
      let data = JSON.parse(e.dataTransfer.getData('object'));
      this.context[this.handler](data, e, this.params);
    });
  }

  unbind() {
    // remove listeners
    this.element.removeEventListener('dragenter');
    this.element.removeEventListener('dragover');
    this.element.removeEventListener('dragleave');
    this.element.removeEventListener('drop');
  }
}
