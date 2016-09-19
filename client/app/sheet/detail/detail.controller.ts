'use strict';

interface Sheet {
  name: string;
  creator: string;
}

export default class SheetDetailController {
  sheet: Sheet = {
    name: '',
    creator: ''
  };
  SheetManager;

    /*@ngInject*/
  constructor(SheetManager) {
    this.SheetManager = SheetManager;
    this.sheet = {
      name: this.sheet.name,
      creator: '57dfed0f9abde877125ff928'
    }
  }

  add() {
    console.log(this.sheet);
    return this.SheetManager.createSheet(this.sheet)
        .then(() => {
          // Account created, redirect to home
          console.log('c bon');
        })
        .catch(err => {
          err = err.data;
        });
  }
}
