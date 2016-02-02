/**
 * Created by ericjohnson on 12/7/15.
 */
import 'jquery';
import {inject, bindable, customAttribute} from 'aurelia-framework';
import {PostBox} from 'postbox';
@customAttribute('drag')
@inject(Element, PostBox)
export class Drag {
  @bindable target = 'enable';
  @bindable data = {};
  @bindable dropClass = {};

  constructor(element, postBox) {
    let i;
    this.element = element;
    this.pb = postBox;
    // set element to draggable
    this.element.draggable = true;
    // set inner element dragability to false so that only the drag elements gets pulled over
    for (i = 0; i < this.element.children.length; i++) {
      this.element.children[i].draggable = false;
    }
  }

  dragstartHandler(e) {
    $(this.element).addClass('dragging');
    this.pb.publish('drop-target', this.target);
    $('body').addClass(`${this.target}-target-dragging`);
    e.originalEvent.dataTransfer.setData('data', JSON.stringify(this.data));
  }

  dragHandler() {
    // nothing needed currently
  }

  dragendHandler() {
    $(this.element).removeClass('dragging');
    $('body').removeClass(`${this.target}-target-dragging`);
    this.pb.publish('drop-target', null);
  }

  bind() {
    $(this.element).on('dragstart.dd', (e) => {
      this.dragstartHandler(e);
    });
    $(this.element).on('drag.dd', () => {
      this.dragHandler();
    });
    $(this.element).on('dragend.dd', () => {
      this.dragendHandler();
    });
  }

  unbind() {
    // remove listeners
    $(this.element).off('dragstart.dd');
    $(this.element).off('drag.dd');
    $(this.element).off('dragend.dd');
  }
}
