/**
 * Created by ericjohnson on 12/7/15.
 */

import {inject, bindable, customAttribute} from 'aurelia-framework';

@customAttribute('drag')
@inject(Element)
export class Drag {

  @bindable data = {};

  constructor(element) {
    let i;

    this.element = element;

    // set element to draggable
    this.element.draggable = true;

    // set inner element dragability to false so that only the drag elements gets pulled over
    for (i = 0; i < this.element.children.length; i++) {
      this.element.children[i].draggable = false;
    }
  }

  dragstartHandler(e) {
    $(this.element).addClass('dragging');
    $('body').addClass(`${this.type}-dragging`);
    e.dataTransfer.setData('data', JSON.stringify(data));
  }

  dragHandler() {
    // nothing needed currently
  }

  dragendHandler() {
    $(this.element).removeClass('dragging');
    $('body').removeClass(`${this.type}-dragging`);
  }

  bind() {
    this.element.addEventListener('dragstart', (e) => {
      this.dragstartHandler(e);
    });

    this.element.addEventListener('drag', () => {
      this.dragHandler();
    });

    this.element.addEventListener('dragend', () => {
      this.dragendHandler();
    });
  }

  unbind() {
    // remove listeners
    this.element.removeEventListener('dragstart');
    this.element.removeEventListener('drag');
    this.element.removeEventListener('dragend');
  }


}
