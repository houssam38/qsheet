'use strict';

export default class SheetListController {
  sheets: Object[];
  SheetManager;

    /*@ngInject*/
  constructor(Sheet, SheetManager) {
    this.sheets = Sheet.query();
    this.SheetManager = SheetManager;
  }

  delete(sheet) {
      sheet.$remove();
      this.sheets.splice(this.sheets.indexOf(sheet), 1);
  }
}
