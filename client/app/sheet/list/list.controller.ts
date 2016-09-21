'use strict';

export default class SheetListController {
  sheets: Object[];

    /*@ngInject*/
  constructor(Sheet, Auth) {
    var that = this;
    Auth.getCurrentUser().then( function(res) {
        console.log(res._id);
        Sheet.getUserSheets().$promise.then( function (res) {
            console.log(res);
            that.sheets = res;
        });
        console.log(that.sheets);
    });
  }

  delete(sheet) {
      sheet.$remove();
      this.sheets.splice(this.sheets.indexOf(sheet), 1);
  }
}
