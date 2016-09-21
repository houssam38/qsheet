'use strict';

interface Sheet {
  _id: string;
  name: string;
  creator: string;
}

export default class SheetDetailController {
  sheet: Sheet = {
    _id: null,
    name: '',
    creator: ''
  };
  SheetManager;
  $state;

    /*@ngInject*/
  constructor(Sheet, SheetManager, $state, $stateParams) {
    var that = this;
    this.SheetManager = SheetManager;
    this.sheet = {
      _id : null,
      name: this.sheet.name,
      creator: '57dfed0f9abde877125ff928'
    };
    this.$state = $state;
    if($stateParams.sheetId != undefined) {
      Sheet.get({ 'id': $stateParams.sheetId }, function(response) {
        that.sheet = response;
      }, function(err) {

      });
    }
  }

  save() {
    if (this.sheet._id == null) {
      return this.SheetManager.createSheet(this.sheet)
          .then(() => {
            this.$state.go('sheet');
          })
          .catch(err => {
            err = err.data;
          });
    } else {
        return this.SheetManager.updateSheet(this.sheet)
            .then(() => {
              this.$state.go('sheet');
            })
            .catch(err => {
              err = err.data;
            });
    }
  }
}
