/**
 * Created by ericjohnson on 12/7/15.
 */
import 'jquery';
import {inject, bindable, customAttribute} from 'aurelia-framework';
import {PostBox} from 'postbox';
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
    $(this.element).on('dragenter.dd', () => {
      $(this.element).addClass('drag-over');
    });
    $(this.element).on('dragover.dd', (e) => {
      // allow drop to happen
      e.preventDefault();
    });
    $(this.element).on('dragleave.dd', () => {
      $(this.element).removeClass('drag-over');
    });
    $(this.element).on('drop.dd', (e) => {
      e.preventDefault();
      // then handle
      $(this.element).removeClass('drag-over');
      let data = JSON.parse(e.originalEvent.dataTransfer.getData('data'));
      this.context[this.handler](data, e, this.params);
    });
  }

  stopListening() {
    // remove listeners
    $(this.element).off('dragenter.dd');
    $(this.element).off('dragover.dd');
    $(this.element).off('dragleave.dd');
    $(this.element).off('drop.dd');
  }

  bind(bindingContext, overrideContext) {
    // set context
    this.context = typeof(bindingContext[this.handler]) === 'function' ? bindingContext : overrideContext.parentOverrideContext.bindingContext;
    // this creates a pb listener to get target type for dropping
    this.pb.subscribe('drop-target', payload => {
      if (payload === this.target) {
        this.listen();
        let i;
        for (i = 0; i < this.element.children.length; i++) {
          $(this.element.children[i]).css('pointer-events', 'none');
        }
      } else {
        this.stopListening();
        let i;
        for (i = 0; i < this.element.children.length; i++) {
          $(this.element.children[i]).css('pointer-events', 'inherit');
        }
      }
    });
  }

  unbind() {
    this.stopListening();
  }
}
