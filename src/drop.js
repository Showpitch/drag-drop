/**
 * Created by ericjohnson on 12/7/15.
 */

import {inject, bindable, customAttribute} from 'aurelia-framework';
import {PostBox} from 'aurelia-postbox';

@customAttribute('drop')
@inject(Element, PostBox)
export class Drop {

  @bindable target = 'enable';
  @bindable handler;
  @bindable params = {};

  constructor(element, postBox) {
    this.element = element;
    this.pb = postBox;
  }

  listen() {
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
      let data = JSON.parse(e.dataTransfer.getData('data'));
      this.context[this.handler](data, e, this.params);
    });
  }

  stopListening() {
    // remove listeners
    this.element.removeEventListener('dragenter');
    this.element.removeEventListener('dragover');
    this.element.removeEventListener('dragleave');
    this.element.removeEventListener('drop');
  }

  bind(bindingContext, overrideContext) {
    // set context
    this.context = typeof(bindingContext[this.handler]) === 'function' ? bindingContext : overrideContext.parentOverrideContext.bindingContext;

    // this creates a pb listener to get target type for dropping
    this.pb.subscribe('drop-target', payload => {
      if (payload === this.target) {
        this.listen();
      } else {
        this.stopListening();
      }
    });
  }

  unbind() {
    this.stopListening();
  }
}
