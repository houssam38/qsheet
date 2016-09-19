'use strict';

export default class SheetListController {
  sheets: Object[];

    /*@ngInject*/
  constructor(Sheet) {
    console.log('uuu');
    this.sheets = Sheet.query();
  }
}
