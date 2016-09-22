'use strict';

export default class SheetListController {
  sheets: Object[];
  private $state

    /*@ngInject*/
  constructor(Sheet, Auth, $state) {
    var that = this;
    that.$state = $state
    Auth.getCurrentUser().then( function(res) {
        console.log(res._id);
        Sheet.getUserSheets().$promise.then( function (res) {
            console.log(res);
            that.sheets = res;
        });
        console.log(that.sheets);
    });
  }

  view(id) {
    this.$state.go('answer', {idSheet : id})
  }
  delete(sheet) {
      sheet.$remove();
      this.sheets.splice(this.sheets.indexOf(sheet), 1);
  }
}
